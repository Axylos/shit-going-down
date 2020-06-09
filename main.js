import { runner } from './run.js'
import ViewManager from './ViewManager.js';

async function main() {
  const root = document.querySelector('.root');
  const vm = new ViewManager(root);
  const resp = await fetch('https://shitgoingdown.com/api/verify');
  let verified;
  if (resp.ok) {
    const data = await resp.json();
    verified = data.verified;
  }
  vm.init(verified);
  runner();
}

main();
