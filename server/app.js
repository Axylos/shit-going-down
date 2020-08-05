import express from 'express';
import logger from './logger.js';
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
app.use(pinoLogger({ logger }));
app.use(bodyParser.json());
app.use(cors(opts));
app.use(cookieParser());
app.use('/sms/static', express.static('public'))
app.use(createLocaleMiddleware());

app.use('/sms', SmsController);

app.get('/info/about', (req, res) => {
  logger.info(JSON.stringify(req.locale));
  if (req.params.cmd === "first-about" && req.locale.region === "IL") {
      res.render("aboutHebrew")
      return;
  }

  res.render("about")
});

app.get('/info/about-hebrew', (req, res) => {
  res.render("aboutHebrew")
})

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
    req.log.info(e.stack);
    res.json("invalid id");
  }
});

app.post('/api/message', async (req, res) => {
  req.log.info('got one');
  try {
    req.log.info(req.body);
    const { recipients, fund } = req.body;
    const { hash } = req.cookies;
    const { oauth_token, oauth_secret, name } = await getUser(hash);
    req.log.info('reps: ', JSON.stringify(recipients));
    const promises = recipients.map(async (recipient) => {
      await sendMsg(oauth_token, oauth_secret, recipient.id_str, recipient.name, fund, name);
    })

    await Promise.all(promises);

    res.json('yay');
  } catch (e) {
    req.log.error(e.stack);
    res.sendStatus(500);
  }
});

app.get('/api/verify', async (req, res) => {
  req.log.info('got another');
  try {
    const hash = req.cookies.hash;
    req.log.info('hash: ' + hash);
    if (!hash) {
      res.json({ verified: false });
      return;
    }
    const { oauth_token, oauth_secret } = await getUser(hash);
    const verified = await verify(oauth_token, oauth_secret);
    req.log.info('verified: ' + verified);
    res.set('Access-Control-Allow-Credentials', 'true');
    res.json({ verified });
  } catch (e) {
    req.log.error(e.stack);
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
  req.log.info(data.toString());
  res.set('foo', 'ba');
  res.set('Access-Control-Allow-Credentials', 'true');
  res.cookie('hash', userData.hash, {
    maxAge: 86_400_000,
  })

  res.redirect(303, '/?cmd=twitter-auth');
});

app.get('/api/contacts', async (req, res) => {
  try {

    const { hash } = req.cookies;
    req.log.info(hash);
    const { oauth_token, oauth_secret } = await getUser(hash);

    const contacts = await getUserContacts(oauth_token, oauth_secret, req.log);
    res.set('Access-Control-Allow-Credentials', 'true')
    res.json(contacts);
  } catch (e) {
    req.log.error(e.stack);
    res.send(502);
  }
});

app.get('/api/login', async (req, res) => {
  const token = await getOauthToken();
  req.log.error('got here');
  req.log.info('token: ' + JSON.stringify(token));

  try {

    const { oauth_token, oauth_token_secret } = qs.decode(token);
    const baseUrl = 'https://api.twitter.com/oauth/authorize?'
    const url = `${baseUrl}${token}`;
    req.log.info(url);
    res.redirect(url);
  } catch (e) {
    req.log.error(e.stack);
    res.status(404).send();
  }
})

app.get('/', (req, res) => {
  res.json({msg: 'hello world'})
});

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send("Sorry we ran into an internal error.  Try again later.")
});

app.listen(PORT, () => logger.info('up and running on ', PORT));
