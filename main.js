import { runner } from './run.js'
import ViewManager from './ViewManager.js';

function main() {
  const root = document.querySelector('.root');
  const vm = new ViewManager(root);
  vm.init();
  runner();
}

main();
