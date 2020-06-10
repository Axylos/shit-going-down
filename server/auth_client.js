import axios from 'axios';
import crypto from 'crypto';
import Twitter from 'twitter-lite';
import dotenv from 'dotenv';
dotenv.config();

const oauth_timestamp = Math.round((new Date()).getTime() / 1000);
const hash = crypto.createHash('md5').update(oauth_timestamp.toString()).digest('hex');
const url = 'https://api.twitter.com/oauth/request_token';
const consumer_key = process.env.TWITTER_CONSUMER_KEY;
const consumer_secret = process.env.TWITTER_CONSUMER_SECRET;
const signing_key = encodeURIComponent(consumer_secret) + '&';


const params = {
  oauth_callback: 'https://draketalley.com/bail/callback',
  oauth_nonce: hash,
  oauth_signature_method: 'HMAC-SHA1',
  oauth_timestamp,
  oauth_consumer_key: consumer_key,
  oauth_version: '1.0'
};

const vals = {};

for (let [key, val] of Object.entries(params)) {
  vals[encodeURIComponent(key)] = encodeURIComponent(val);
}

const keyList = Object.keys(vals).sort()
const values = keyList.map(key => {
  return `${key}=${vals[key]}`
}).join('&')

const valString = encodeURIComponent(values);
const raw_vals = ['POST', encodeURIComponent(url), valString];
const str = raw_vals.join('&');


const sig = encodeURIComponent(crypto.createHmac('sha1', signing_key)
  .update(str)
  .digest('Base64'));

const auth = `OAuth oauth_consumer_key="${vals.oauth_consumer_key}", oauth_nonce="${vals.oauth_nonce}", oauth_callback="${vals.oauth_callback}", oauth_signature_method="HMAC-SHA1", oauth_timestamp="${vals.oauth_timestamp}",  oauth_signature="${sig}", oauth_version="1.0"`;

export async function getOauthToken() {
  try {

    const resp = await axios({
      method: "POST",
      url,
      headers: {
        Authorization: auth
      }
    });
    return resp.data;
  } catch (e) {
    console.error('err: ', e.message);
    console.log(e.response.data);
  } 
}

export async function getClient(tokenKey, secret) {
  try {

    console.log('token: ', tokenKey, ' secret: ', secret)
  const opts = {
      subdomain: "api",
      version: "1.1",
      consumer_key,
      consumer_secret,
      access_token_key: tokenKey,
      access_token_secret: secret
  }
  const client = new Twitter(opts);

  // const results = await client.get("account/verify_credentials");
  return client;

  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function sendMsg(tokenKey, secret, recipientId) {
  const client = await getClient(tokenKey, secret);
  console.log('send msg: ', tokenKey, secret, recipientId)
  try {

  const response = await client.post('direct_messages/events/new', {
    event: {
      type: 'message_create',
      message_create: {
        target: { recipient_id: recipientId },
        message_data: {
          text: "Shit Goin' Down!!!"
        }
      },
    }
  });
  return response;
  } catch (e) {
    console.log(e);
  }
}

export async function getUserContacts(token, secret) {
  const client = await getClient(token, secret);
  console.log('client: ', client);
  const resp = await client.get("friends/list");

  return resp;
}