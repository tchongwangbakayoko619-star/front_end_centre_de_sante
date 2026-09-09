# Directives & Règles Projet — CS² Health Frontend

## Règle Fondamentale : Travail Exclusif à partir de l'Existant (Source de Vérité)

Pour toute tâche, modification ou ajout de fonctionnalité sur le frontend :

1. **Analyser l'Existant au Préalable :**
   - Toujours consulter et analyser la structure des composants (`templates/components/`), des squelettes de pages (`templates/layouts/`), des vues métier (`templates/pages/`), des styles Tailwind CLI (`static/css/input.css`) et des scripts JavaScript (`static/js/`).

2. **Réutilisation Systématique :**
   - Ne jamais repartir de zéro et ne jamais créer une nouvelle logique si des composants, layouts, fonctions ou conventions existent déjà dans le projet.
   - Les cartes ([`kpi-card.html`](file:///home/bakayoko2-0/Bureau/my_project/frontend/cs2-health/frontend/templates/components/cards/kpi-card.html), [`appointment-card.html`](file:///home/bakayoko2-0/Bureau/my_project/frontend/cs2-health/frontend/templates/components/cards/appointment-card.html), [`patient-card.html`](file:///home/bakayoko2-0/Bureau/my_project/frontend/cs2-health/frontend/templates/components/cards/patient-card.html)), boutons ([`button.html`](file:///home/bakayoko2-0/Bureau/my_project/frontend/cs2-health/frontend/templates/components/ui/button.html)) et layouts ([`app.html`](file:///home/bakayoko2-0/Bureau/my_project/frontend/cs2-health/frontend/templates/layouts/app.html), [`dashboard.html`](file:///home/bakayoko2-0/Bureau/my_project/frontend/cs2-health/frontend/templates/layouts/dashboard.html)) existants sont la référence absolue.

3. **Continuité & Non-Régression :**
   - Toute nouvelle fonctionnalité doit s'insérer comme une suite logique du frontend déjà construit.
   - Conserver scrupuleusement le fonctionnement des autres parties de l'application et éviter tout changement superflu.

4. **Workflow avant chaque génération :**
   - **Analyse :** Examiner l'implémentation existante.
   - **Compréhension :** Assimiler les mécanismes actuels.
   - **Identification :** Cibler les éléments à réutiliser.
   - **Adaptation :** Développer en prolongeant l'existant.
   - **Vérification :** S'assurer de la parfaite cohérence esthétique et technique globale.
