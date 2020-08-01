import express from 'express';
import { storeContact } from './db.js';
import { sendMsg, buildBody } from './sms.js';

const router = express.Router();

router.get('/select-contacts', (req, res) => res.render('select_contacts'));
router.get('/sender', (req, res) => res.render('sender'));
router.post('/send', async (req, res) => {
  console.log(req.body);
  if (req.body.err) {
    console.log('client error: ', req.body.err);
  }
  const { phone, coords, fbData: { fbName, fbId } } = req.body;
  const { region } = req.locale;
  const data = {
    phone,
    coords,
    fbName,
    fbId,
    contactName,
    region
  };
  try {
    const resp = await storeContact(data);
    const url = `ssgd.me/${resp.id}`;
    const body = buildBody(url, fbName, coords, region);
    await sendMsg(phone, body);
  } catch (e) { 
    console.log(e) 
  } finally {
    res.json({msg: 'ok', phone});
  }
});

router.get('/', async (req, res) => {

  //await sendMsg('+1 901-484-4933', 'it works');
  res.render('sms');
});

export default router;
