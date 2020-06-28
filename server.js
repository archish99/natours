const mongoose = require('mongoose');

const dotenv = require('dotenv');

// Handling uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception... Shutting Down');
  console.log(err.name, err.message);
  process.exit(1);
});

// Configuring the environmental variables path
dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    // .connect(process.env.DATABASE_LOCAL, {   // command for connecting to local db
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful'));

// Port
const port = process.env.PORT || 3000;

// Start server
const server = app.listen(port, () => {
  console.log(`App running on port ${port}....`);
});

// Handling unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection... Shutting Down');
  console.log(err);
  server.close(() => {
    // 1 is used for unhandled rejection
    process.exit(1);
  });
});
