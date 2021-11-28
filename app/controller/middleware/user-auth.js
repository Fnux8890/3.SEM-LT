import { verify } from 'jsonwebtoken';

export default function requireAuth(req, res, next) {
  const token = req.cookies.jwt;

  if (token) {
    verify(token, process.env.JWT_KEY, (err) => {
      if (err) {
        res.redirect('/page/login');
      } else {
        next();
      }
    });
  } else {
    res.redirect('/page/login');
  }
}
