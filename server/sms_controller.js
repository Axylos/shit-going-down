import express from 'express';
import { storeContact } from './db.js';
import { sendMsg, buildBody } from './sms.js';

const router = express.Router();

router.get('/select-contacts', (req, res) => res.render('select_contacts'));
router.get('/sender', (req, res) => res.render('sender'));
router.post('/send', async (req, res) => {
  req.log.info('body: ' + JSON.stringify(req.body));
  if (req.body.err) {
    req.log.error('client error: ', req.body.err);
  }
  const { phone, coords, fbData: { fbName, fbId }, contactName } = req.body;
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
    const body = buildBody(url, fbName, contactName, coords, region, req.log);
    const coordsIsEmpty = coords === null;
    await sendMsg(phone, body, req.log);
  } catch (e) { 
    req.log.error(e.stack) 
  } finally {
    res.json({msg: 'ok', phone});
  }
});

router.get('/', (req, res) => {
  req.log.info('test route');
  res.render('sms');
});

export default router;
