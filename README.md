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
---
### **Installation du projet**

* Clôner le code du projet depuis le dépôt Github (https://github.com/KT539/ProjFront)
* Naviguer dans le dossier ProjFront (commande: cd ProjFront)
* Lancer la commande: npm install
---
### **Architecture du projet**

Le projet utilise une structure standard pour une application Vue.js / Vite.


#### Structure interne du dossier `src/`

* `api/` : Gestion des appels API (OMDb, Axios)
* `assets/` : Fichier statiques (CSS, images)
* `components/` : Composants Vue réutilisables
* `pages/` : Pages de l'application (routes)
* `router/` : Configuration de Vue Router
* `stores/` : Modules Pinia pour la gestion centralisée et globale des états
* `utils/` : Fonctions utilitaires (favoris)
* `App.vue` : Composant racine
* `main.js` : Point d'entrée de l'application
---

### **Guide d'utilisation de l'API**

Ce projet utilise l'API **OMDb (The Open Movie Database)** pour récupérer les données de films et de séries.

#### 1. Configuration de l'API

L'accès à l'API nécessite une clé (API Key), configurée dans le fichier d'environnement **`.env`** à la racine du projet.

Cette clé est automatiquement injectée dans toutes les requêtes grâce à l'intercepteur configuré dans les clients Axios (`src/api/axiosClient.js` et `src/api/omdbClients.js`).

#### 2. Liens de l'API

* **Endpoint de base :** `https://www.omdbapi.com/`
* **Documentation :** [Lien vers la documentation OMDb](http://www.omdbapi.com/)

#### 3. Exemples d'intégration (fichiers `src/api/`)

La logique des appels API est centralisée dans le dossier `src/api/` pour une meilleure gestion et réutilisation.

| Fichier | Rôle | Exemple d'utilisation dans le code |
| :--- | :--- | :--- |
| `axiosClient.js` | **Client de base** : Crée une instance d'Axios, définit l'`baseURL` (`https://www.omdbapi.com/`) et ajoute l'`apikey` à chaque requête via un intercepteur. | `axiosClient.get("/", { params: { i: id } })` |
| `movies.js` | **Services** : Contient des fonctions métiers de haut niveau pour l'application. | Fonction `searchMovies(query)` qui renvoie une liste de résultats suite à une recherche par titre. |
| `omdbApi.js` | **Services** : Fonctions d'accès par titre (`t`) ou par ID (`i`). | `getMovieById(id)` appelle le client pour récupérer les détails. |

**Exemple de requête (Recherche par titre) :**

La fonction `searchMovies` dans `src/api/movies.js` enveloppe l'appel au client de cette manière :

```javascript
// src/api/movies.js
export const searchMovies = async (query) => {
  // Appel au client avec le paramètre 's' (search)
  const res = await axiosClient.get("/", { params: { s: query } });

  // Retourne les résultats si la réponse est valide
  return res.data.Response === "True" ? res.data.Search : [];
};
