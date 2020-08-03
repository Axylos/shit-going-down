import pgp from 'pg-promise';
import crypto from 'crypto';

function getHash() {
  const oauth_timestamp = Math.round((new Date()).getTime() / 1000);
  const hash = crypto.createHash('md5').update(oauth_timestamp.toString()).digest('hex');
  return hash;
}

const db = pgp()({
  user: 'bail',
  password: 'bail',
  database: 'bail',
});

export async function fetchContactData(id) {
  const data = await db.one(`
  SELECT *
  FROM contacts
  WHERE id = $1
  `, id);

  return data;
}

export async function storeContact({
  fbId,
  fbName,
  phone,
  coords,
  region,
  contactName
}) {
  const resp = await db.one(`
  INSERT INTO contacts
  (fb_id, fb_name, phone, coords, region, name)
  VALUES
  ($1, $2, $3, $4, $5, $6)
  RETURNING *
  `, [fbId, fbName, phone, coords, region, contactName]);

  return resp;
}

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
  return resp;
}

export async function createDatabase() {
  await db.none(`
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS contacts;

  CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  hash VARCHAR(255) NOT NULL,
  twitter_id VARCHAR(255) NOT NULL,
  oauth_token VARCHAR(255) NOT NULL,
  oauth_secret VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL
  );

  CREATE table contacts (
  ID TEXT PRIMARY KEY,
  name VARCHAR(50),
  phone VARCHAR(20),
  fb_id VARCHAR(50),
  fb_name VARCHAR(80),
  coords VARCHAR(255),
  region VARCHAR(255)
  );

  CREATE TRIGGER trigger_contacts_genid
  BEFORE INSERT ON contacts FOR EACH ROW EXECUTE PROCEDURE unique_short_id();
  `);
}
