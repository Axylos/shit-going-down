const WELCOME = 'welcome';
const SELECT_CONTACTS = 'select_contacts';
const LOGIN = 'login';
const SELECT_FUND = 'select_fund';
const BUTTONS = 'buttons';
const INSTRUCTIONS = 'instructions';
import Welcome from './Welcome.js';
import Login from './Login.js';
import SelectContacts from './SelectContacts.js';
import SelectFund from './SelectFund.js';
import Buttons from './Buttons.js';
import Instructions from './Instructions.js';

class ViewManager {
  constructor(rootEl) {
    const localFund = JSON.parse(localStorage.getItem('fund'));
    const localContacts = JSON.parse(localStorage.getItem('contacts'));
    this.fund = localFund !== null ? localFund : null;
    this.selectedContacts = localContacts !== null? localContacts : [];

    this.rootEl = rootEl;
    this.current = null;
    this.view = null;
  }

  getInitial(verified) {
    if (!verified && this.selectedContacts === null && this.fund === null) {
      return WELCOME;
    } else if (this.fund !== null && this.selectedContacts !== null && this.selectedContacts.length > 0) {
      return BUTTONS;
    } else if (this.selectedContacts.length < 1) {
      return SELECT_CONTACTS;
    } else {
      return SELECT_FUND;
    }
  }

  init(verified) {
    const initial = this.getInitial(verified)
    this.initial = initial;
    this.current = this.initial;
    this.render(); 
  }

  render() {
    if (this.current !== this.initial) {
      this.view.unmount();
    }
    this.rootEl.innerHTML = '';
    
    this.view = this.getView();
    this.rootEl.append(this.view.render());
  }

  handleSelectContactIds(ids) {
    this.selectedContacts = ids;
    localStorage.setItem('contacts', JSON.stringify(this.selectedContacts))
  }

  handleSelectFund(fund) {
    this.fund = fund;
    localStorage.setItem('fund', JSON.stringify(fund));
  }

  getView() {
    let goForward;
    let goBack;
    switch(this.current) {
      case WELCOME:
        goForward = () => {
          this.current = INSTRUCTIONS;
          this.render();
        };
        return new Welcome(goForward);
      case INSTRUCTIONS:
          goForward = () => {
            this.current = LOGIN;
            this.render();
          };
          return new Instructions(goForward);
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
        return new SelectContacts(goForward, this.handleSelectContactIds.bind(this), goBack, this.selectedContacts);
      case SELECT_FUND:
        goForward = () => {
          this.current = BUTTONS;
          this.render();
        }
        goBack = () => {
          this.current = SELECT_CONTACTS;
          this.render();
        }
        return new SelectFund(this.handleSelectFund.bind(this), goForward, goBack, this.fund);
      case BUTTONS:
        goForward = () => {
          this.current = BUTTONS;
          this.render();
        }
        goBack = () => {
          this.current = SELECT_FUND;
          this.render();
        }
        return new Buttons(this.selectedContacts, this.fund, goForward, goBack);
    }
  }
}

export default ViewManager;
