import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import sanitizeHtml from 'sanitize-html';

dotenv.config();

const app = express();
app.use(helmet()); // En-têtes de sécurité HTTP
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requêtes par IP
  message: { error: 'Trop de requêtes, veuillez réessayer plus tard' },
});
app.use(limiter);

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

// Interface pour le JWT
interface JwtUser {
  id: number;
  email: string;
}

// Étendre Request
interface AuthRequest extends Request {
  user?: JwtUser;
}

// Middleware pour vérifier le JWT
const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Token requis' });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err) {
      res.status(403).json({ error: 'Token invalide' });
      return;
    }
    req.user = user as JwtUser;
    next();
  });
};

// Inscription
app.post('/register', async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  console.log('Requête /register reçue:', { firstName, lastName, email, passwordLength: password.length });
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Email invalide' });
  }
  if (password.length < 12) {
    return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 12 caractères' });
  }
  try {
    console.log('Connexion à PostgreSQL...');
    await pool.query('SELECT 1'); // Test connexion
    console.log('Hachage du mot de passe...');
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Exécution de la requête SQL...');
    const result = await pool.query(
      'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, email',
      [firstName, lastName, email, hashedPassword]
    );
    console.log('Requête SQL réussie:', result.rows[0]);
    const user = result.rows[0];
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET non défini');
    }
    console.log('Génération du token JWT...');
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Inscription réussie pour:', email);
    res.status(201).json({ user, token });
  } catch (error: any) {
    console.error('Erreur lors de l’inscription:', {
      message: error.message,
      code: error.code,
      detail: error.detail,
      stack: error.stack,
    });
    if (error.code === '23505') {
      res.status(400).json({ error: 'Email déjà utilisé' });
    } else {
      res.status(500).json({ error: 'Erreur serveur', detail: error.message });
    }
  }
});

// Connexion
app.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log('Requête /login reçue:', { email });
  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis' });
  }
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    console.log('Connexion réussie pour:', email);
    res.json({ user: { id: user.id, first_name: user.first_name, last_name: user.last_name, email: user.email }, token });
  } catch (error: any) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ error: 'Erreur serveur', detail: error.message });
  }
});

// Mise à jour du profil
app.put('/update-profile', authenticateToken, async (req: AuthRequest, res: Response) => {
  const { email, currentPassword, newPassword } = req.body;
  console.log('Requête /update-profile reçue:', { email });
  if (!email || !currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Email invalide' });
  }
  if (newPassword.length < 12) {
    return res.status(400).json({ error: 'Le nouveau mot de passe doit contenir au moins 12 caractères' });
  }
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [req.user!.id]);
    const user = result.rows[0];
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Mot de passe actuel incorrect' });
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await pool.query(
      'UPDATE users SET email = $1, password = $2 WHERE id = $3',
      [email, hashedNewPassword, req.user!.id]
    );
    console.log('Profil mis à jour pour:', email);
    res.json({ message: 'Profil mis à jour' });
  } catch (error: any) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    if (error.code === '23505') {
      res.status(400).json({ error: 'Email déjà utilisé' });
    } else {
      res.status(500).json({ error: 'Erreur serveur', detail: error.message });
    }
  }
});

// Ajouter une tâche
app.post('/tasks', authenticateToken, async (req: AuthRequest, res: Response) => {
  const { title } = req.body;
  console.log('Requête /tasks POST reçue:', { title });
  if (!title) {
    return res.status(400).json({ error: 'Titre requis' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO tasks (user_id, title, completed) VALUES ($1, $2, $3) RETURNING *',
      [req.user!.id, title, false]
    );
    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    console.error('Erreur lors de l’ajout de la tâche:', error);
    res.status(500).json({ error: 'Erreur serveur', detail: error.message });
  }
});

// Lister les tâches
app.get('/tasks', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM tasks WHERE user_id = $1', [req.user!.id]);
    res.json(result.rows);
  } catch (error: any) {
    console.error('Erreur lors de la liste des tâches:', error);
    res.status(500).json({ error: 'Erreur serveur', detail: error.message });
  }
});

// Modifier une tâche
app.put('/tasks/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  console.log('Requête /tasks/:id PUT reçue:', { id, title, completed });
  try {
    const result = await pool.query(
      'UPDATE tasks SET title = COALESCE($1, title), completed = COALESCE($2, completed) WHERE id = $3 AND user_id = $4 RETURNING *',
      [title, completed, id, req.user!.id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Tâche non trouvée' });
    }
    res.json(result.rows[0]);
  } catch (error: any) {
    console.error('Erreur lors de la modification de la tâche:', error);
    res.status(500).json({ error: 'Erreur serveur', detail: error.message });
  }
});

// Supprimer une tâche
app.delete('/tasks/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  console.log('Requête /tasks/:id DELETE reçue:', { id });
  try {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *', [id, req.user!.id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Tâche non trouvée' });
    }
    res.json({ message: 'Tâche supprimée' });
  } catch (error: any) {
    console.error('Erreur lors de la suppression de la tâche:', error);
    res.status(500).json({ error: 'Erreur serveur', detail: error.message });
  }
});

// Ajouter un message de contact
app.post('/contact', async (req: Request, res: Response) => {
  const { name, email, message } = req.body;
  console.log('Requête /contact reçue:', { name, email, messageLength: message.length });
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }
  const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const messageRegex = /^[\s\S]{10,}$/;
  if (!nameRegex.test(name)) {
    return res.status(400).json({ error: 'Nom invalide (lettres seulement, un seul espace entre mots)' });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Email invalide' });
  }
  const sanitizedMessage = sanitizeHtml(message, { allowedTags: [], allowedAttributes: {} });
  if (!messageRegex.test(sanitizedMessage)) {
    return res.status(400).json({ error: `Message trop court (au moins 10 caractères, actuel: ${sanitizedMessage.length})` });
  }
  try {
    const result = await pool.query(
      'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING *',
      [name, email, sanitizedMessage]
    );
    console.log('Message de contact enregistré:', result.rows[0]);
    res.status(201).json({ message: 'Message envoyé avec succès', data: result.rows[0] });
  } catch (error: any) {
    console.error('Erreur lors de l’enregistrement du message:', error);
    res.status(500).json({ error: 'Erreur serveur', detail: error.message });
  }
});

const PORT: number = parseInt(process.env.PORT || '3000', 10);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server started on port:${PORT}`);
});