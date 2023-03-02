require('dotenv').config(); //esto es para configurar las variables de entorno, se podría hacer de otra forma pero esta es mejor

//listen lo que hace es ejectuqar bajo ese puerto
const Server = require('./models/server');

const server = new Server();

server.listen();
