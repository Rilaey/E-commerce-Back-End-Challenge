const express = require('express');
const routes = require('./routes');
// import sequelize connection
const sequelize = require('./config/connection')

const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// sync sequelize models to the database, then turn on the server

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});