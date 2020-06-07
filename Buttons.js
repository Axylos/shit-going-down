export default class Buttons {
  constructor(getLocation, dm, call, goBack) {
    this.el = document.createElement('div');
    this.getLocation = this.getLocation;
    // this.dm = dm;
    // this.call = call;
    this.handleCall = this.handleCall.bind(this);
    this.handleDM = this.handleDM.bind(this);
    this.goBack = goBack;

  }

  handleBack() {
    console.log('go back');
    this.goBack();
  }

  handleDM(e) {
    e.preventDefault();
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

      <div class='upButtons>
      <h1 class="logo">CALLBAIL.ME</h1>
      <button class='backBtn'>back</button>
      </div>

      <div class='buttons'>
        <div class='bailDiv'>
        <button class="callBail">Call Bail Fund</button>
        <p class='storedData'>The bail fund info:</p>

        </div>
        <div class='smsDiv'>
        <button class="SMS">SMS Emergency Contacts</button>

        <p class='msg'>Contact of massege: hey, I think I need you to check on me and contact...  </p>

        </div>
      </div>

      </div>
    `;
    this.el.querySelector('backBtn').addEventListener('click', this.handleBack)
    this.el.querySelector('.callBail').addEventListener('click', this.handleCall);
    this.el.querySelector('.SMS').addEventListener('click', e  => {
        this.handleDM(e);
        return `
          <div class='alert'>
            <p class="sent">Meassege sent! stay safe!</p>
          </div>
          `
    })

    return this.el;
  }


  unmount() {
    this.el.querySelector('.callBail').removeEventListener('click', this.handleCall);
    this.el.querySelector('.SMS').removeEventListener('click', this.handleDM);
    this.el.querySelector('backBtn').removeEventListener('click', this.handleBack);

  }
}