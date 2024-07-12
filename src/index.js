const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models/index");

const app = express();

const { PORT } = require("./config/serverConfig");
const ApiRoutes = require("./routes/index");

const setupAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/api',ApiRoutes);

  app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);
    if (process.env.SYNC_DB) {
          try {
            await db.sequelize.sync({ alter: true });
            console.log('Database synchronized successfully');
          } catch (error) {
            console.error('Error synchronizing the database:', error);
          }
        }
  });
};

setupAndStartServer();
