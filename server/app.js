import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import qs from 'querystring';
import { storeToken, getSecretFromToken, getUser } from './db.js';
import { getToken } from './token.js';
import { getOauthToken, getClient, getUserContacts, sendMsg, verify } from './auth_client.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

app.post('/message', async (req, res) => {
  try {
    console.log(req.body);
    const { recipients, fund } = req.body;
    const { hash } = req.cookies;
    const { oauth_token, oauth_secret, name } = await getUser(hash);
    console.log('reps: ', recipients);
    const promises = recipients.map(async (recipient) => {
      const response = await sendMsg(oauth_token, oauth_secret, recipient.id, recipient.name, fund, name);
      console.log(response);
    })

    await Promise.all(promises);

    res.json('yay');
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

app.get('/verify', async (req, res) => {
  try {
    const { hash } = req.cookies;
    console.log('ash: ', hash);
    if (!hash) {
      throw new Error('did not receive hash');
    }
    const { oauth_token, oauth_secret } = await getUser(hash);
    const verified = await verify(oauth_token, oauth_secret);
    console.log('verified: ', verified);
    res.json({ verified });
  } catch (e) {
    console.log(e);
    res.json({ verified: false });
  }
});

app.get('/callback', async (req, res) => {
  const query = req.query;
  const tokenData = await getToken(query.oauth_token, query.oauth_verifier);
  const { oauth_token, oauth_token_secret, user_id, screen_name } = qs.decode(tokenData);
  const userData = await storeToken(
    oauth_token,
    oauth_token_secret, 
    user_id,
    screen_name
  );
  console.log('from callback: ', oauth_token, oauth_token_secret);
  const data = await getClient(oauth_token, oauth_token_secret);
  console.log(data);
  res.cookie('hash', userData.hash, {
    maxAge: 86_400_000,
    httpOnly: true
  }).redirect('/');
});

app.get('/contacts', async (req, res) => {
  try {

    const { hash } = req.cookies;
    console.log(hash);
    const { oauth_token, oauth_secret } = await getUser(hash);

    const contacts = await getUserContacts(oauth_token, oauth_secret);
    res.json(contacts);
  } catch (e) {
    console.log(e);
    console.error('error: ', e.message);
    res.send(502);
  }
});

app.get('/login', async (req, res) => {
  const token = await getOauthToken();

  try {

    const { oauth_token, oauth_token_secret } = qs.decode(token);
    const baseUrl = 'https://api.twitter.com/oauth/authorize?'
    const url = `${baseUrl}${token}`;
    res.redirect(url);
  } catch (e) {
    console.log(e);
    res.status(404).send();
  }
})

app.get('/', (req, res) => {
  res.json({msg: 'hello world'})
});

app.listen(PORT, () => console.log('up and running on 3000'));
