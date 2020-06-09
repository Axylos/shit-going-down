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

  getContactList() {
    return this.recipients.map(contact => {
      return `
      <div class="contact-reminder">
        ${contact.name} -- ${contact.screen_name}
      </div>
      `;
    }).join('');
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

    <div class="generalpage">
       <div class="upButtons">
         <a class="logo" href="https://shitgoingdown.com">shitgoingdown.com</a>
       </div>
       <div class="navLinks">
          <a class="goBack" href="#"> back »</a> 
        </div>

      <div class='finalPage'>
      <div class='buttons'>
        <div class='bailDiv'>
          <a class="telBail" href="tel:+1${this.fund.phone}"><button class="callBail">Call Bail Fund</button></a>
          <p class='storedDataInfo'>The bail fund info:</p>
          <p class='storedData'><strong>Name:</strong> ${this.fund.name}, </br>
          <strong>Tel:</strong> +1${this.fund.phone}</br>
          ${this.fund.city}, ${this.fund.state}</p>
        </div>
        <div class='smsDiv'>
        <button class="SMS">DM Emergency Contacts</button>
        <p class="contact-listAlert"> your message will be sent to the contacts you chooce: </br>
        ${this.getContactList()}
        </p>
        </div>
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
