import express from 'express';
import { sendMsg } from './sms.js';

const router = express.Router();

router.get('/select-contacts', (req, res) => res.render('select_contacts'));
router.get('/sender', (req, res) => res.render('sender'));
router.post('/send', async (req, res) => {
  console.log(req.body);
  const { phone } = req.body;
  await sendMsg(phone, "why hello you");
  res.json({msg: 'ok', phone});
});

router.get('/', async (req, res) => {

  //await sendMsg('+1 901-484-4933', 'it works');
  res.render('sms');
});

export default router;
