# CS² Health — Prototype Frontend & Templates Django-Ready

Bienvenue dans le prototype **CS² Health**, l'interface du système de gestion médicale et du module Réception (patients, rendez-vous, consultations, notifications).

Ce prototype est entièrement restructuré selon une architecture **DRY (Don't Repeat Yourself)**, conforme aux standards **Django**, accessible (WCAG / a11y) et optimisé pour la production.

---

## 🎨 Charte Visuelle & Design System

Le projet utilise le Design System officiel **CS² Health** :
- **Palette Principale (Teal)** : `--cs2-brand-600` (`#0d9488`), `--cs2-brand-700` (`#0f766e`), `--cs2-brand-50` (`#f0fdfa`), `--cs2-brand-950` (`#042f2e`).
- **Neutres (Slate)** : `--cs2-neutral-50` (`#f8fafc`), `--cs2-neutral-200` (`#e2e8f0`), `--cs2-neutral-950` (`#020617`).
- **Typographies** : Titres en `Plus Jakarta Sans` et corps de texte en `Inter`.

---

## 📁 Architecture des Templates Django

Toutes les pages du dossier `frontend/templates/pages/` étendent les master layouts shells officiels :

```
frontend/templates/
├── layouts/
│   ├── app.html              # Layout Master principal (Header + Sidebar + Main Block)
│   └── auth.html             # Layout Master Authentification
├── components/
│   ├── sidebar.html          # Source UNIQUE de vérité de la navigation latérale
│   ├── header.html           # Source UNIQUE de la barre supérieure (Topbar)
│   ├── modal.html            # Composants modales
│   └── ...
└── pages/
    ├── reception/
    │   ├── appointments/     # Agenda, création, édition, détails RDV
    │   ├── patients/         # Liste, admission, dossier patient
    │   ├── notifications/    # Envoi SMS, historique
    │   └── reminders/        # Paramètres des rappels
    ├── users/                # Gestion des utilisateurs
    ├── profile/              # Profil utilisateur
    ├── auth/                 # Formulaires de connexion / mot de passe
    └── design-system.html    # Documentation interactive du Design System
```

### Exemple de structure d'une page métier :

```html
{% extends "layouts/app.html" %}
{% load static %}

{% block title %}Planning & Agenda des Rendez-Vous — CS² Health{% endblock %}

{% block breadcrumb %}
  <span>ACCUEIL</span> &gt; <span class="text-cs2-brand-600 font-extrabold">AGENDA</span>
{% endblock %}

{% block content %}
  <!-- Contenu spécifique de la page -->
{% endblock %}
```

---

## 🚀 Pipeline d'Assets & Architecture JavaScript

Les assets sont regroupés exclusivement dans `frontend/static/` :
- `frontend/static/css/` : Fichiers CSS source et CSS compilé (`styles.css`).
- `frontend/static/js/` : Architecture JavaScript modulaire structurée par scénarios :
  - `core/` : Initialisation, résolution de chemins (`cs2-paths.js`), thème (`theme.js`), utilitaires (`utils.js`), application (`app.js`).
  - `components/` : Scripts de composants UI globaux (`cs2-logo.js`, `modal.js`, `dropdown.js`, `navigation.js`, `sidebar.js`, `toast.js`).
  - `loaders/` : Chargeurs dynamiques de mise en page (`header-loader.js`, `sidebar-loader.js`).
  - `modules/auth/` : Scénarios métier d'authentification (`login.js`, `password-toggle.js`, `password-strength.js`, `forgot-password.js`, `reset-password.js`, `form-validation.js`, `auth-state.js`, `auth-button-loader.js`).

### Commandes de Build CSS (Tailwind CLI local) :

Dans le dossier `frontend/` :

```bash
# Compilation unique de production (minifiée)
npm run build:css

# Mode Watcher pour le développement continu
npm run watch:css
```

---

## ♿ Accessibilité (WCAG / a11y)

- **Skip Link** : Lien "Aller au contenu principal" présent au sommet des layouts pour les lecteurs d'écran et la navigation au clavier.
- **Taille de Police** : Corps de texte standardisé à `16px` (`1rem`).
- **Attributs ARIA** : Accordéons et menus dotés de `aria-expanded` et `aria-controls`.
- **Modales Sécurisées** : Modales configurées avec `role="dialog"`, `aria-modal="true"`, injection sécurisée par `textContent` (anti-XSS) et fermeture via la touche `Échap`.

---

## 🔒 Formulaires & Authentification

- Les formulaires POST utilisent le tag `{% csrf_token %}` et la méthode `method="POST"`.
