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

const initial = WELCOME;
class ViewManager {
  constructor(rootEl) {
    this.rootEl = rootEl;
    this.current = initial;
    this.view = null;
    this.contacts = [];
    this.fund = { name: 'fucker', phone: '9014844933' };
    this.selectedContacts = [];
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
    this.selectedContacts = ids;
  }

  handleSelectFund(fund) {
    this.fund = fund;
  }

  getView() {
    let goForward;
    let goBack;
    switch(this.current) {
      case WELCOME:
        goForward = () => {
          this.current = LOGIN;
          this.render();
        };
        return new Welcome(goForward);
      case LOGIN:
        goForward = () => {
          this.current = SELECT_CONTACTS;
          this.render();
        } 
        return new Login(goForward);
      case SELECT_CONTACTS: 
        goForward = () => {
          this.current = SELECT_FUND;
          this.render();
        }
        goBack = () => {
          this.current = LOGIN;
          this.render();
        }
        return new SelectContacts(goForward, this.handleSelectContactIds.bind(this), goBack);
      case SELECT_FUND:
        goForward = () => {
          this.current = BUTTONS;
          this.render()
        }
        return new SelectFund(this.handleSelectFund.bind(this), goForward);
      case BUTTONS:
        goForward = () => {
          this.current = BUTTONS;
          this.render()
        }
        return new Buttons(this.selectedContacts, this.fund, goForward);
    }
  }
}

export default ViewManager;
