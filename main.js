import { runner } from './run.js'
import ViewManager from './ViewManager.js';

function main() {
  console.log('wat');
  const root = document.querySelector('.root');
  const vm = new ViewManager(root);
  vm.init();
  runner();
}

main();
