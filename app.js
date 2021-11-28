import express from 'express';
import { join } from 'path';
import cors from 'cors';

// custom middlewares
// eslint-disable-next-line
import { insertNavbar } from '@middleware/insertNavbar';
import connectDB from './app/db/connect';
// import routes
import userRoutes from './app/controller/routes/users';
import pageRoutes from './app/controller/routes/pages';
import buildRoute from './app/controller/routes/buildRoute';

const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

// const declare
const port = 3000;
const app = express();

// Load view enigne
app.set('views', join(__dirname, 'app', 'views', 'pages'));
app.set('view engine', 'pug');

// middleware
app.options('*', cors());
app.use(express.static(join(__dirname, 'app', 'views')));
app.use('scripts/', express.static('/node_modules/'));
app.use(express.json()); // Kan se JSON payloads fra front-end
app.use(express.urlencoded({ extended: false })); // Kan se String/text payloads fra front-end
// app.use("/page/*", insertNavbar);
app.use(cookieParser());
app.use(fileUpload());

// routes
app.get('/', (req, res) => {
  res.redirect('/page/module-overview');
  res.end();
});
app.use('/api/v1/users', userRoutes);
app.use('/page', pageRoutes);
app.use('/build', buildRoute);

// error handler
app.use((err, req, res) => {
  // eslint-disable-next-line no-console
  console.log(`Stack: ${err.stack}`);
  // eslint-disable-next-line no-console
  console.log(`Message: ${err.message}`);
  // eslint-disable-next-line no-console
  console.log(`Status: ${err.status}`);
  res.status(err.status || 500);

  res.render('error', {
    errorCode: err.status,
    errorMessage: err.message,
  });
});

// server setup
const start = () => {
  try {
    connectDB();
    app.listen(
      port,
      // eslint-disable-next-line no-console
      console.log(`server listening at: http://localhost:${port}`),
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error.message);
  }
};
start();
