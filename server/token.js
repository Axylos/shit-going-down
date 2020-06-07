import axios from 'axios';
import querystring from 'querystring';

const url = 'https://api.twitter.com/oauth/access_token'

export async function getToken(oauth_token, oauth_verifier) {
  try {
  const resp = await axios.post(url, null, {
    params: {
      oauth_token,
      oauth_verifier
    }  
  });
  return resp.data;
  } catch (e) {
    console.error('err: ', e);
  } 
}
