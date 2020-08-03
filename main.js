import ViewManager from './ViewManager.js';

async function main() {
  const root = document.querySelector('.root');
  const vm = new ViewManager(root);
  let verified;
  try {
    const resp = await fetch('/api/verify', { credentials: 'include' });
    if (resp.ok) {
      const data = await resp.json();
      verified = data.verified ? "verified" : "unverified";
    } else {
      verified = "failed"
    }
  } catch (e) {
    verified = "failed";
  }
  vm.init(verified);
}

main();
