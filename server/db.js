import pgp from 'pg-promise';
import crypto from 'crypto';

function getHash() {
  const oauth_timestamp = Math.round((new Date()).getTime() / 1000);
  const hash = crypto.createHash('md5').update(oauth_timestamp.toString()).digest('hex');
  return hash;
}

const db = pgp()({
  host: 'localhost',
  database: 'bail',
});

export async function getUser(hash) {
  const resp = await db.one(`
  SELECT * FROM users where hash = $1
  `, hash)

  return resp;
}
export async function getSecretFromToken(token) {
  const resp = await db.one(`
  SELECT * from users WHERE oauth_token = $1
  `, token);

  return resp;
}

export async function storeToken(token, secret, twitter_id, name) {
  const hash = getHash();
  const resp = await db.one(`
  INSERT INTO users 
  (oauth_token, oauth_secret, twitter_id, name, hash)
  VALUES
  ($1, $2, $3, $4, $5)
  RETURNING *
  `, [token, secret, twitter_id, name, hash]);
  console.log(resp);
  return resp;
}

export async function createDatabase() {
  await db.none(`
  CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  hash VARCHAR(255) NOT NULL,
  twitter_id VARCHAR(255) NOT NULL,
  oauth_token VARCHAR(255) NOT NULL,
  oauth_secret VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL
  )
  `);
}
