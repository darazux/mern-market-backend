// utils/auth.js

const jwt = require('jsonwebtoken');

const secret_key = process.env.JWT_SECRET_KEY;

const auth = async (req, res, next) => {
  if (req.mthod === 'GET') {
    return next();
  }

  const token = await req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(400).json({ message: 'トークンがありません' });
  }
  try {
    const decoded = jwt.verify(token, secret_key);
    req.body.email = decoded.email;
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'トークンが正しくないので、ログインしてください' });
  }
};

module.exports = auth;
