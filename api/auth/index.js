const router = require('express').Router();
module.exports = router;

const jwt = require('jsonwebtoken');

const secret = 'a_secret_key'; // you need a secret key to sign the token

router.post('/login', doLogin, async (req, res) => {
  const token = jwt.sign({ username: req.username }, secret, {
    expiresIn: '1h',
  });

  /**
   * in the response body you can send the token plus the user id to start populating your app with data
   * or you can send the token only and then use it to auth and start retrieving the data
   * up to you
  */
  res.status(200).send({token: token}) 
});

router.post('/verify-token', verifyToken, (req, res) => {
  res.status(200).send({success: 'authenticated'})
});

/**
 * Middleware functions
 */
function doLogin(req, res, next) {
  const { username, password } = req.body; // 1 liner function to destructure incoming body D:

  if (username === 'chris' && password === '123456789') {
    req.username = username; // set a request parameter has the username to pass to the next function

    return next();
  }

  /**
   * if the details are not correct on the incoming body the app will send thi error message
   */
  res.status(401).send('{"error": "invalid details!"}');
}

function verifyToken(req, res, next) {
  const bearer = req.headers.authorization;

  if(!bearer) {
    return res.status(401).send({error: 'no authorization header sent.'})
  }

  let token = bearer.split(' ');
  token = token[1];

  if(!token) {
    return res.status(401).send({error: 'no token present in the header.'})
  }

  const {username} = jwt.decode(token) // this will pull the username from the token
  if(!username) {
    return res.status(401).send({error: 'invalid token used for auth'})
  }

  next()
}