const WELCOME = 'welcome';
const SELECT_CONTACTS = 'select_contacts';
const LOGIN = 'login';
const SELECT_FUND = 'select_fund';
const BUTTONS = 'buttons';
import Welcome from './Welcome.js';
import Login from './Login.js';
import SelectContacts from './SelectContacts.js';
import SelectFund from './SelectFund.js';
import Buttons from './Buttons.js';

class ViewManager {
  constructor(rootEl) {
    this.rootEl = rootEl;
    this.current = WELCOME;
    this.view = null;
    this.contactIds = [];
    this.fund = null;
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

  handleSelectContactIds(ids) {
    this.contactIds = ids;
  }

  handleSelectFund(fund) {
    this.fund = fund;
  }

  getView() {
    switch(this.current) {
      case WELCOME:
        return new Welcome(() => {
          this.current = LOGIN;
          this.render();
        });
      case LOGIN:
        return new Login(() => {
          this.current = SELECT_CONTACTS;
          this.render();
        })
      case SELECT_CONTACTS: 
        return new SelectContacts(() => {
          this.current = SELECT_FUND;
          this.render();
        }, this.handleSelectContactIds.bind(this));
      case SELECT_FUND:
        return new SelectFund(this.handleSelectFund.bind(this), () =>{
          this.current = BUTTONS;
          this.render()
        });
    }
  }
}

export default ViewManager;
