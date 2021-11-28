import { verify } from 'jsonwebtoken';

export const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    verify(token, process.env.JWT_KEY, (err, decodedToken) => {
      if (err) {
        res.redirect('/page/login');
      } else {
        next();
      }
    });
  } else {
    res.redirect('/page/login');
  }
};
