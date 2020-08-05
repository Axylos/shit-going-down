import express from 'express';
import { storeContact } from './db.js';
import { sendMsg, buildBody } from './sms.js';
import { parsePhone } from './util.js';

const router = express.Router();

router.get('/select-contacts', (req, res) => res.render('select_contacts'));
router.get('/sender', (req, res) => res.render('sender'));
router.post('/send', async (req, res) => {
  try {
    req.log.info('body: ' + JSON.stringify(req.body));
    if (req.body.err) {
      req.log.error('client error: ', req.body.err);
    }
    const { phone, coords, fbData: { fbName, fbId }, contactName, country } = req.body;

    const parsedPhone = parsePhone(phone, country);
    const { region } = req.locale;
    const data = {
      phone: parsedPhone,
      coords,
      fbName,
      fbId,
      contactName,
      region
    };
    const resp = await storeContact(data);
    const url = `ssgd.me/${resp.id}`;
    const body = buildBody(url, fbName, contactName, coords, region, req.log);
    const coordsIsEmpty = coords === null;
    req.log.info(`body country: ${country}`)
    await sendMsg(parsedPhone, body, country);
  } catch (e) { 
    req.log.error(e.stack) 
  } finally {
    res.json({msg: 'ok'});
  }
});

router.get('/', (req, res) => {
  req.log.info('test route');
  res.render('sms');
});

export default router;
