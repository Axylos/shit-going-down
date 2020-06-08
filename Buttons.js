import MessageModal from './MessageModal.js';
export default class Buttons {
  constructor(recipients, fund, goBack, call)  {
    this.el = document.createElement('div');
    this.getLocation = this.getLocation;
    // this.dm = dm;
    this.call = call;
    this.handleCall = this.handleCall.bind(this);
    this.handleDM = this.handleDM.bind(this);
    //this.goBack = goBack;
    this.recipients = recipients;
    this.fund = fund;
  }

  async handleDM() {
    const resp = await fetch('https://draketalley.com/bail/message', {method: 'POST', body: JSON.stringify({recipients: this.recipients}), headers: { 'Content-Type': 'application/json' }});
    if (resp.ok) {
      const data = resp.json();
      console.log(data);
    }
  }

  handleBack() {
    console.log('go back');
    this.goBack();
  }

  openModal(e) {
    e.preventDefault();
    const modal = new MessageModal(this.recipients, this.handleDM.bind(this));
    this.el.append(modal.render());
    console.log('MSG DM');
    // this.dm();
  }

  handleCall(e) {
    e.preventDefault();
    console.log('Calling bail');
    // this.call()
  }

  handleBack(e) {
    e.preventDefault();
    console.log('back');
  }

  //   getLocation() {
  //     if(navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(showPosition);
  //     } else {
  //       console.log("Geo Location not supported by browser");
  //     }
  //   }
  //   //function that retrieves the position
  //   function showPosition(position) {
  //     var location = {
  //       longitude: position.coords.longitude,
  //       latitude: position.coords.latitude
  //     }
  //     console.log(location)
  //   }
  //   //request for location
  //   this.getLocation();
  // }

  render() {
    this.el.innerHTML = `
      <div class='finalPage'>

      <div class="upButtons">
      <h1 class="logo">CALLBAIL.ME</h1>
      <button class="backBtn">back</button>
      </div>

      <div class='buttons'>
        <div class='bailDiv'>
          <a href="tel:+1${this.fund.phone}"><button class="callBail">Call Bail Fund</button></a>
          <p class='storedData'>The bail fund info:</p>
          <div>You chose ${this.fund.name}</div>
        </div>
        <div class='smsDiv'>
        <button class="SMS">SMS Emergency Contacts</button>

        </div>
      </div>

      </div>
    `;
    this.el.querySelector('.backBtn').addEventListener('click', this.handleBack)
    //this.el.querySelector('.callBail').addEventListener('click', this.handleCall);
    this.el.querySelector('.SMS').addEventListener('click', e  => {
      this.openModal(e);
    });

    return this.el;
  }


  unmount() {
    this.el.querySelector('.callBail').removeEventListener('click', this.handleCall);
    this.el.querySelector('.SMS').removeEventListener('click', this.openModal);
    this.el.querySelector('backBtn').removeEventListener('click', this.handleBack);

  }
}
