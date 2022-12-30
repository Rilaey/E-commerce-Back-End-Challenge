const express = require('express');
const routes = require('./routes');
// import sequelize connection
const sequelize = require('./config/connection')

const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// sync sequelize models to the database, then turn on the server
// ifee
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("db connected");
  } catch (error) {
    console.log(error);
    console.log("db could not be connected");
  }
})();

app.use(routes);

app.listen(PORT, () => {
  console.log(`App is currently live on port ${PORT} 🤙🏼`)
})
