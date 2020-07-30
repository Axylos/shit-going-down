import express from 'express';
import { sendMsg, buildBody } from './sms.js';

const router = express.Router();

router.get('/select-contacts', (req, res) => res.render('select_contacts'));
router.get('/sender', (req, res) => res.render('sender'));
router.post('/send', async (req, res) => {
  console.log(req.body);
  if (req.body.err) {
    console.log('client error: ', req.body.err);
  }
  const { phone, coords } = req.body;
  const body = buildBody(phone, coords);
  await sendMsg(phone, body);
  res.json({msg: 'ok', phone});
});

router.get('/', async (req, res) => {

  //await sendMsg('+1 901-484-4933', 'it works');
  res.render('sms');
});

export default router;
