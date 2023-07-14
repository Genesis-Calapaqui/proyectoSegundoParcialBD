const express = require('express');

const app = express();
const PORT = 4000;
const HOST ='0.0.0.0' // Puerto en el que escuchará el servidor

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Routes
app.use(require('./routes/index'));

app.listen(PORT,HOST, () => {
  console.log(`Server listening on port ${PORT}`);
});