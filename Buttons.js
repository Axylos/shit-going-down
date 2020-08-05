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

    const resp = await fetch('/api/message', {method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json'}, credentials: 'include'});
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

  buildBailSection() {
    if (this.fund.id === 55) {
      return "";
    } else {

    return `<div class='centerBail'>
       <div class='divBail'>
         <a class="telBail" href="tel:+1${this.fund.number}">
         <button class="text callBail"> <span class="click">Click to</span> Call Bail Fund</button>
         </a>
       </div>
       <p class='loginInstructionTwo btn'><span class="help name">The bail fund info:</span>
          Name: ${this.fund.name}, </br>
           Tel: <a class="loginInstructionTwo btn" href="tel:+1${this.fund.number}">+1${this.fund.number}</a></br>
           ${this.fund.city}, ${this.fund.state}</p>
    </div>`;
    }
  }
  render() {
    this.el.innerHTML = `
    <div class="generalpage">

    <div class="containNav">
      <div class="nav">
        <div class="upButtons">
          <a class="navQuestion" href="/info/about"> ? </a>
          <a class="logo" href="/">www.shitgoingdown.com</a>
          <a class="navBtn nextEnd" href="#"> ► </a>
        </div>
      </div>
      <a class="navBtn back" href="/?cmd=twitter-fund">◄◄ </a>
    </div>

  <div class='finalPage'>
  <div class="white">
  <div class="safeDiv">
    <h1 class="safe">stay safe</h1>
  </div>

  <div class='buttons'>
 
  <div class="btnSection">
    ${this.buildBailSection()}
  
      <div class='centerDM'>
        <div class='divDM'>
          <button class="text DM"><span class="click">Click to</span> DM trusted friends</button>
        </div>
          <p class="loginInstructionTwo btn"> <span class="help name">your friends info:</span></br>
           ${this.getContactList()}
          </p>
       </div>
       </div>
    </div>
    </div>
   </div>
   </div>
     
    `;
    this.el.querySelector('.navBtn.nextEnd').addEventListener('click', this.goBack)
    //this.el.querySelector('.callBail').addEventListener('click', this.handleCall);
    this.el.querySelector('.text.DM').addEventListener('click', e => {
      this.openModal(e);
    });

    return this.el;
  }

  unmount() {
    //this.el.querySelector('.text.callBail').removeEventListener('click', this.handleCall);
    //this.el.querySelector('.text.DM').removeEventListener('click', this.openModal);
    //this.el.querySelector('navBtn.End').removeEventListener('click', this.goBack);

  }
}
