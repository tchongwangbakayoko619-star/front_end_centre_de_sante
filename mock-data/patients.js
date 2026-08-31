// mock-data/patients.js
// Ces données sont fournies à titre indicatif pour visualiser la structure de données.
// L'interface HTML a été construite de manière statique pour anticiper le rendu serveur de Django.
// Il ne faut PAS utiliser ce fichier pour générer le DOM via JavaScript.

const mockPatients = [
    {
        id: "PAT-001",
        identifier: "PAT-001",
        firstName: "Jean",
        lastName: "Kouassi",
        age: 34,
        gender: "M",
        status: "active",
        phone: "+237 6 00 00 00 00",
        email: "jean.kouassi@example.com",
        lastVisit: "2026-08-26T09:30:00Z"
    },
    {
        id: "PAT-002",
        identifier: "PAT-002",
        firstName: "Marie",
        lastName: "Ndong",
        age: 28,
        gender: "F",
        status: "active",
        phone: "+237 6 11 11 11 11",
        email: "marie.ndong@example.com",
        lastVisit: "2026-08-25T14:15:00Z"
    }
];

export default mockPatients;
