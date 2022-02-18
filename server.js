//Install express server
const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 8080;

const app = express();


// Serve only the static files form the dist directory


app.get('/*', (req, res) => {
    res.sendFile('index.html');
  });

// Start the app by listening on the default Heroku port
app.listen(PORT, () => {
  console.log('Servidor iniciado na porta' + PORT);
});
