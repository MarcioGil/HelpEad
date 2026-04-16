// Configuração inicial do Firebase Functions
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Exemplo de função HTTP
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('API da Plataforma EAD ativa!');
});

// ... Outras funções serão adicionadas conforme o desenvolvimento
