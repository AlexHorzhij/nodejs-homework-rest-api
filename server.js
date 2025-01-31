const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { createFoldersForAvatar } = require('./servises');

dotenv.config();
const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('Database connection successful');
    app.listen(PORT, () => {
      createFoldersForAvatar();
      console.log('Server running. Use our API on port: 3000');
    });
  })
  .catch(err => {
    console.log(err.message);
    process.exit(1);
  });
