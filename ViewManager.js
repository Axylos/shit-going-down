const WELCOME = 'welcome';
const CONTACT_SELECT = 'contact_select';
import ContactSelect from './ContactsSelect.js';
import Welcome from './Welcome.js';

class ViewManager {
  constructor(rootEl) {
    this.rootEl = rootEl;
    this.current = CONTACT_SELECT;
    this.view = null;
  }

  init() {
    this.render(); 
  }

  render() {
    if (this.view !== null) {
      this.view.unmount();
    }
    this.rootEl.innerHTML = '';
    
    this.view = this.getView();
    this.rootEl.append(this.view.render());
  }

  getView() {
    switch(this.current) {
      case WELCOME:
        return new Welcome();
      case CONTACT_SELECT: 
        return new ContactSelect();
    }
  }
}

export default ViewManager;
