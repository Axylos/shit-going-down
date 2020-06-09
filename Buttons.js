import MessageModal from './MessageModal.js';
export default class Buttons {
  constructor(recipients, fund, call, goBack)  {
    this.el = document.createElement('div');
    this.getLocation = this.getLocation;
    this.call = call;
    this.handleCall = this.handleCall.bind(this);
    this.handleDM = this.handleDM.bind(this);
    this.goBack = goBack;
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
  }

  handleCall(e) {
    e.preventDefault();
    console.log('Calling bail');
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

    <div class="upButtons">
      <a class="logo" href="https://shitgoingdown.com">shitgoingdown.com</a>
    </div>
    <div class="navLinks">
     <a class="goBack" href="#"> back »</back> 
    </div>

      <div class='finalPage'>
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
    this.el.querySelector('.goBack').addEventListener('click', this.goBack)
    //this.el.querySelector('.callBail').addEventListener('click', this.handleCall);
    this.el.querySelector('.SMS').addEventListener('click', e  => {
      this.openModal(e);
    });

    return this.el;
  }


  unmount() {
    this.el.querySelector('.callBail').removeEventListener('click', this.handleCall);
    this.el.querySelector('.SMS').removeEventListener('click', this.openModal);
    this.el.querySelector('.goBack').removeEventListener('click', this.goBack);

  }
}
