import * as jwt from 'jsonwebtoken';

function getAccessToken(req) {
  try {
    const authHeader = req.headers['authorization'];
    const authContent = authHeader && authHeader.split(' ');
    if (
      !authHeader ||
      authContent.length !== 2 ||
      authContent[0] !== 'Bearer' ||
      authContent[1] === null
    ) {
      console.log('Access token not provided or invalid');
      return null;
    }
    return authContent[1];
  } catch (err) {
    console.log('Access token not provided or invalid');
    return null;
  }
}

export async function authenticationMiddleware(req, res, next) {
  try {
    const token = getAccessToken(req);
    if (token === null) {
      return res.status(401).json({ message: 'Access token not found' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(401).json({ message: 'Invalid access token' });
      }
      req.user = user;
      req.accessToken = token;
      next();
    });
  } catch (err) {
    console.log('Fail to authenticate token in middleware');
    console.log(err);
    return res
      .status(500)
      .json({ message: 'Problem encountered when validating token' });
  }
}

export async function optionalAuthenticationMiddleware(req, res, next) {
  try {
    const token = getAccessToken(req);
    if (token === null) {
      next();
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (!err) {
        req.user = user;
        req.accessToken = token;
        console.log('managed to get user', user);
      }
      next();
    });
  } catch (err) {
    console.log('Fail to authenticate token in middleware');
    console.log(err);
    return res
      .status(500)
      .json({ message: 'Problem encountered when validating token' });
  }
}
