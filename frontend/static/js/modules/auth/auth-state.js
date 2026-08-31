// js/auth/auth-state.js
// Gestionnaire d'état de l'authentification (utile si appel à des API REST)
window.AuthState = {
    isAuthenticated: false,
    user: null,
    
    login: async (credentials) => {
        // Logique API potentielle
        console.log("Tentative de connexion...");
    },
    
    logout: async () => {
        // Logique API potentielle
        console.log("Déconnexion...");
        // window.location.href = '/login.html';
    },

    checkSession: () => {
        // Vérification de validité du token
    }
};
