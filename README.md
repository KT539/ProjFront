# ProjFront Alexandre, Kilian et Alex

### **Objectif**

Créer une appli frontend en Vue.js qui consomme les données d'une **API externe**.

Choix retenu : 

* OMDb (The Open Movie Database)
---
### **Fonctionnalités attendues**

* Recherche d'élément
* Vue détaillé d'un élément
* Organisation des résultats (filtrage, tri,...)
* (Bonus) Création de pdf, favori, autre
---
### **Contraintes techniques**

* Vue.js3 avec composition API
* Vue Router
* Pinia ou autre solution de gestion d'état
* Axios pour les requêtes HTTP
* Interface responsive (mobile + Desktop)
* Structure basée sur des composants
* Fichier README avec explication de l'installation et de l'utilisation
--- 
### **Livrables**

* appli fonctionnelle
* Code source sur un dépôt Git
* README complet



---
---
### **Installation du projet**

* Clôner le code du projet depuis le dépôt Github (https://github.com/KT539/ProjFront)
* Naviguer dans le dossier ProjFront (commande: cd ProjFront)
* Lancer la commande: npm install
---
### **Structure interne du projet**

ProjFront/
├── .vscode/                 # Configuration de l’éditeur (VS Code)
├── node_modules/            # Dépendances du projet
├── src/                     # Code source principal
│   ├── api/                 # Gestion des appels API (OMDb, Axios)
│   ├── assets/              # Fichiers statiques (CSS, images)
│   ├── components/          # Composants réutilisables Vue
│   ├── pages/               # Pages de l’application (routes)
│   ├── router/              # Configuration de Vue Router
│   ├── stores/              # Stores Pinia (état global)
│   ├── utils/               # Fonctions utilitaires (gestion des favoris)
│   ├── App.vue              # Composant racine
│   └── main.js              # Point d’entrée de l’application
├── .env                     # Variables d’environnement (clé API, etc.)
├── index.html               # Template HTML principal
├── package.json             # Dépendances et scripts npm
└── vite.config.js           # Configuration Vite
---
### **Guide d'utilisation de l'API**

* à rajouter
