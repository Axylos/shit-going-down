import MessageModal from './MessageModal.js';
export default class Buttons {
  constructor(recipients, fund, call, goBack) {
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
    const payload = {
      recipients: this.recipients,
      fund: this.fund
    }
    const resp = await fetch('https://shitgoingdown.com/api/message', {method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' }});
    if (resp.ok) {
      const data = resp.json();
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
        <a class="goBackEnd" href="#">« back</a>
      </div>
      <div class='finalPage'>
      <h1 class="safe">stay safe</h1>
       <div class='buttons'>
        <div class='bailDiv'>
          <a class="telBail" href="tel:+1${this.fund.number}"><button class="callBail">Call</br> Bail</br> Fund</button></a>
          <p class='storedDataInfo'>The bail fund info:</p>
          <p class='storedData'><strong>Name:</strong> ${this.fund.name}, </br>
           <strong>Tel:</strong> <a class="storedData" href="tel:+1${this.fund.number}">+1${this.fund.number}</a></br>
           ${this.fund.city}, ${this.fund.state}</p>
         </div>
         <div class='smsDiv'>
          <button class="SMS">DM trusted friends</button>
          <p class="contact-listAlert"> <span class="contartsMSG">your contacts info:<span> </br>
           ${this.getContactList()}
          </p>
         </div>
        </div>
       </div>
      </div>
    `;
    this.el.querySelector('.goBackEnd').addEventListener('click', this.goBack)
    //this.el.querySelector('.callBail').addEventListener('click', this.handleCall);
    this.el.querySelector('.SMS').addEventListener('click', e => {
      this.openModal(e);
    });

    return this.el;
  }


  unmount() {
    this.el.querySelector('.callBail').removeEventListener('click', this.handleCall);
    this.el.querySelector('.SMS').removeEventListener('click', this.openModal);
    this.el.querySelector('.goBackEnd').removeEventListener('click', this.goBack);

  }
}
