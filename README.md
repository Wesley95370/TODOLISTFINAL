TODOLISTkevin
Bienvenue dans TODOLISTkevin, une application mobile de gestion de tâches développée avec React Native et un backend Node.js. Ce projet permet aux utilisateurs de créer, gérer et organiser leurs tâches avec une interface intuitive et sécurisée, le tout dans un style inspiré du PSG ! ⚽
📋 Table des matières

Fonctionnalités
Technologies utilisées
Couleurs du thème
Architecture
Sécurité
Opérations CRUD
Installation
Utilisation
Outils de développement
Contribuer
Licence

✨ Fonctionnalités

Authentification : Inscription, connexion et mise à jour du profil utilisateur avec JWT.
Gestion des tâches : Création, lecture, mise à jour et suppression de tâches (CRUD).
Formulaire de contact : Envoi de messages sécurisés avec validation.
Interface utilisateur : Navigation fluide avec menu burger, barre de navigation inférieure, et design responsive.
Sécurité renforcée : Protection contre XSS, attaques par force brute, et en-têtes HTTP sécurisés.
Thème PSG : Palette de couleurs inspirée du Paris Saint-Germain.

🛠️ Technologies utilisées

Frontend :
React Native 0.79.3
Axios pour les requêtes HTTP
React Navigation pour la navigation
AsyncStorage pour le stockage local
sanitize-html pour la protection XSS côté client


Backend :
Node.js avec Express.js
PostgreSQL pour la base de données
bcrypt pour le hachage des mots de passe
jsonwebtoken (JWT) pour l’authentification
sanitize-html pour la protection XSS
express-rate-limit pour limiter les requêtes
helmet pour les en-têtes de sécurité HTTP


Langages :
TypeScript (frontend et backend)
Java (pour Android Studio)


Base de données :
PostgreSQL avec tables users, tasks, et contacts



🎨 Couleurs du thème
Le design s’inspire des couleurs emblématiques du Paris Saint-Germain :

Bleu marine : #003087 (fond principal, headers)
Rouge : #DA291C (boutons, accents)
Blanc : #FFFFFF (textes, fonds secondaires)

🏗️ Architecture

Frontend (~/MonProjet) :
Structure : Components (BottomNav, BurgerMenu), Screens (ContactScreen), Contexts (AuthContext).
Fichiers clés : ContactScreen.tsx, AuthContext.tsx.


Backend (~/MonProjet/backend) :
Structure : API REST avec Express.js.
Fichier principal : index.ts.
Endpoints : /register, /login, /update-profile, /tasks, /contact.


Base de données :
Tables :
users : id, first_name, last_name, email, password
tasks : id, user_id, title, completed
contacts : id, name, email, message, created_at





🔒 Sécurité

Protection XSS :
Frontend : Utilisation de sanitize-html pour nettoyer les entrées utilisateur (ex. : formulaire de contact).
Backend : sanitize-html supprime les balises HTML dangereuses.


Protection contre les attaques par force brute :
express-rate-limit limite à 100 requêtes par IP toutes les 15 minutes.


En-têtes HTTP sécurisés :
helmet configure des en-têtes comme X-Content-Type-Options: nosniff, X-Frame-Options: DENY.


Authentification :
JWT avec expiration (1 heure) pour sécuriser les routes protégées.
Mots de passe hachés avec bcrypt (10 rounds).


Validation des données :
Regex stricts pour name, email, et message dans /contact et autres endpoints.
Exemple : nameRegex: /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/



📝 Opérations CRUD

Users :
Create : POST /register (inscription).
Read : Via /login (récupération des infos utilisateur).
Update : PUT /update-profile (email, mot de passe).
Delete : Non implémenté.


Tasks :
Create : POST /tasks (ajouter une tâche).
Read : GET /tasks (lister les tâches).
Update : PUT /tasks/:id (modifier titre ou statut).
Delete : DELETE /tasks/:id (supprimer une tâche).


Contacts :
Create : POST /contact (envoyer un message).
Read/Update/Delete : Non implémenté (admin only).



🚀 Installation
Prérequis

Node.js (v18+)
PostgreSQL
Android Studio (pour émulateur Android)
Java JDK (pour Android)
VS Code (éditeur recommandé)

Backend

Cloner le dépôt :
git clone <url-du-repo>
cd MonProjet/backend


Installer les dépendances :
npm install


Configurer l’environnement :

Créer un fichier .env :
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=todolist
DB_PORT=5432
JWT_SECRET=your_jwt_secret
PORT=3000




Créer les tables PostgreSQL :
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE
);

CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


Lancer le backend :
npm run dev



Frontend

Aller dans le dossier frontend :
cd ../MonProjet


Installer les dépendances :
npm install


Lancer l’émulateur Android via Android Studio.

Lancer l’app :
npx react-native run-android



📱 Utilisation

Inscription/Connexion :
Crée un compte via l’écran d’inscription ou connecte-toi.
Mot de passe : Minimum 12 caractères.


Gestion des tâches :
Ajoute, modifie ou supprime des tâches depuis l’écran principal.


Formulaire de contact :
Envoie un message avec nom, email, et message (10+ caractères).


Navigation :
Utilise le menu burger ou la barre de navigation inférieure.



🧰 Outils de développement

Postman : Test des endpoints API (/register, /login, /tasks, /contact).
Trello : Gestion des tâches et suivi du projet.
VS Code : Éditeur pour TypeScript, avec extensions Prettier et ESLint.
Android Studio : Émulateur Android pour tester l’app.
Canva : Création de maquettes et assets graphiques.
Node.js : Exécution du backend et du frontend.
Java : Configuration d’Android Studio.

🤝 Contribuer

Fork le dépôt.
Crée une branche : git checkout -b feature/nouvelle-fonction.
Commit tes changements : git commit -m "Ajout de nouvelle fonction".
Push : git push origin feature/nouvelle-fonction.
Ouvre une Pull Request.

📜 Licence
Ce projet est sous licence MIT. Voir LICENSE pour plus de détails.

Made with ❤️💙 by Kevin, powered by PSG vibes ! ⚽
