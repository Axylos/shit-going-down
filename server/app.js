import express from 'express';
import pinoLogger from 'express-pino-logger';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import createLocaleMiddleware from 'express-locale';
import qs from 'querystring';
import { storeToken, getSecretFromToken, getUser, fetchContactData } from './db.js';
import { getToken } from './token.js';
import { getOauthToken, getClient, getUserContacts, sendMsg, verify } from './auth_client.js';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

import SmsController from './sms_controller.js';
dotenv.config();

const PORT = process.env.PORT || 3000;

const opts = {
  origin: 'https://www.shitgoingdown.com'
};

const app = express();
app.set('view engine', 'ejs');
app.use(pinoLogger());
app.use(bodyParser.json());
app.use(cors(opts));
app.use(cookieParser());
app.use('/sms/static', express.static('public'))
app.use(createLocaleMiddleware());

app.use('/sms', SmsController);

app.get('/url/:externalId', async (req, res) => {
  const { externalId } = req.params;
  if (externalId.match(/favicon/)) {
    res.sendStatus(404);
    return;
  }
  try {
    const id = externalId;
    const data = await fetchContactData(id);
    const contactName = data.name;
    const fbId = data.fb_id;
    const fbName = data.fb_name
    let mapUrl = null;
    if (data.coords !== null) {
      const { latitude, longitude } = JSON.parse(data.coords);
      mapUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
    }

    const fbUrl = `https://facebook.com/profile?id=${fbId}`;
    res.render("contact_summary", {fbName, fbUrl, mapUrl, contactName});
  } catch (e) {
    console.log(e);
    res.json("invalid id");
  }
});

app.post('/api/message', async (req, res) => {
  try {
    console.log(req.body);
    const { recipients, fund } = req.body;
    const { hash } = req.cookies;
    const { oauth_token, oauth_secret, name } = await getUser(hash);
    console.log('reps: ', recipients);
    const promises = recipients.map(async (recipient) => {
      const response = await sendMsg(oauth_token, oauth_secret, recipient.id_str, recipient.name, fund, name);
      console.log(response);
    })

    await Promise.all(promises);

    res.json('yay');
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

app.get('/api/verify', async (req, res) => {
  try {
    const hash = req.cookies.hash;
    console.log('hash: ', hash);
    if (!hash) {
      throw new Error('did not receive hash');
    }
    const { oauth_token, oauth_secret } = await getUser(hash);
    const verified = await verify(oauth_token, oauth_secret);
    console.log('verified: ', verified);
    res.set('Access-Control-Allow-Credentials', 'true');
    res.json({ verified });
  } catch (e) {
    console.log(e);
    res.set('Access-Control-Allow-Credentials', 'true');
    res.json({ verified: false });
  }
});

app.get('/api/callback', async (req, res) => {
  const query = req.query;
  const tokenData = await getToken(query.oauth_token, query.oauth_verifier);
  const { oauth_token, oauth_token_secret, user_id, screen_name } = qs.decode(tokenData);
  const userData = await storeToken(
    oauth_token,
    oauth_token_secret, 
    user_id,
    screen_name
  );
  const data = await getClient(oauth_token, oauth_token_secret);
  console.log(data);
  res.set('foo', 'ba');
  res.set('Access-Control-Allow-Credentials', 'true');
  res.cookie('hash', userData.hash, {
    maxAge: 86_400_000,
    domain: 'www.shitgoingdown.com'
  })
    .sendFile(path.join(path.resolve(path.dirname('')) + '/redirect.html'));
});

app.get('/api/contacts', async (req, res) => {
  try {

    const { hash } = req.cookies;
    console.log(hash);
    const { oauth_token, oauth_secret } = await getUser(hash);

    const contacts = await getUserContacts(oauth_token, oauth_secret);
    res.set('Access-Control-Allow-Credentials', 'true')
    res.json(contacts);
  } catch (e) {
    console.log(e);
    console.error('error: ', e.message);
    res.send(502);
  }
});

app.get('/api/login', async (req, res) => {
  const token = await getOauthToken();
  console.log(JSON.stringify(token));

  try {

    const { oauth_token, oauth_token_secret } = qs.decode(token);
    const baseUrl = 'https://api.twitter.com/oauth/authorize?'
    const url = `${baseUrl}${token}`;
    console.log(url);
    res.redirect(url);
  } catch (e) {
    console.log(e);
    res.status(404).send();
  }
})

app.get('/', (req, res) => {
  res.json({msg: 'hello world'})
});

app.listen(PORT, () => console.log('up and running on ', PORT));
