import { createDatabase } from './db.js';

async function main() {
  try {
    await createDatabase();
    console.log('all done');
  } catch (e) {
    console.error(e.message);
  } finally {
    process.exit();
  }
}

main();
