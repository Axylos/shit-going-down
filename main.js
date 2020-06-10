import ViewManager from './ViewManager.js';

async function main() {
  const root = document.querySelector('.root');
  const vm = new ViewManager(root);
  let verified;
  try {
    const resp = await fetch('https://shitgoingdown.com/api/verify');
    if (resp.ok) {
      const data = await resp.json();
      verified = data.verified;
    }
  } catch (e) {
    verified = false;
  }
  vm.init(verified);
}

main();
