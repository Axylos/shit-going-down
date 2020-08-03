import logger from './logger.js';
import { createDatabase } from './db.js';

async function main() {
  try {
    await createDatabase();
    logger.info('all done');
  } catch (e) {
    logger.error(e.message);
  } finally {
    process.exit();
  }
}

main();
