export default class Instructions {
  constructor(goToNext) {
    this.handleClick = this.handleClick.bind(this);
    this.el = document.createElement('div');
    this.goToNext = goToNext;
    this.delay = this.delay.bind(this);
    this.pageTransition = this.pageTransition.bind(this);
    this.contentAnimation = this.contentAnimation.bind(this);
    this.initAnimation = this.initAnimation.bind(this);
    this.setTimeout();
    this.modalOpen = false;
  }

  isInstalled() {
    return true;
    return (
      window.matchMedia('(display-mode: standalone)').matches) ||
      (window.navigator.standalone) ||
      document.referrer.includes('android-app://');
  }

  handleClick() {
    if (this.isInstalled()) {
      console.log('go to next page');
      this.goToNext();
    } else {
      this.openModal();
    }
  }

  closeModal() {
    this.modalOpen = false;
    this.render();
  }

  openModal() {
    this.modalOpen = true;
    this.render();
  }

  setTimeout() {
    window.setTimeout(() => {
      this.contentAnimation()
      this.pageTransition()
    }, 1000);
  }

  delay(n) {
    n = n || 2000;
    return new Promise((done) => {
      setTimeout(() => {
        done();
      }, n);
    });
  }

  pageTransition() {
    console.log('clock')
    let tl = gsap.timeline();
    tl.to(".loading-screen", {
      duration: 0,
      opacity: 1,
      delay: 0
    });
    tl.to(".loading-screen", {
      opacity: 1,
      // delay: 0.5,
      // duration: 1.5,
    });
    tl.set(".loading-screen", {})
  }

  contentAnimation() {
    let tl = gsap.timeline();
    tl.from(".animate-this", {
      opacity: 1
    });
    tl.to(".animate-this", {
     
    });
  }

  initAnimation() {
    console.log('click')
    barba.init({
      sync: true,
      transitions: [
        {
          async leave(data) {
            const done = this.async();
            this.pageTransition();
            await this.delay(1000);
            done();
          },
          async enter(data) {
            console.log('done');

            this.contentAnimation();
          },
          async once(data) {
            this.contentAnimation();
          }
        },
      ],
    })
  }

  renderModal() {
    if (this.modalOpen) {
      return `
      <div class="alert-second staySafe">
        <span class="sorry">Sorry!</span> </br>
        It looks like you are browsing from a desktop.</br>

        Please log in via a mobile device, </br> and add to home screen before proceeding.

        </br>
        <button class="close-modal">Close</button>
      </div>
      `
    } else {
      return '';
    }
  }

  render() {
    this.el.innerHTML = `
    <main data-barba="container" data-barba-namespace="instruction-section">
       ${this.renderModal()}
      <div class="InstructionPage">
       <div class="bgInstruction animate-this">
         <p class='homeInstructionTwo animate-text' > <span class="before"> Before starting</span> </br></br> Add the app to your mobile home-screen <strong>*</strong>.</br> 
          Then, activate the app in advance to best protect you and your contacts.</p>
         <button class="download animate-text"></button>
        <div class= "small animate-text">
         <h5 class="homeInstructionThree"><strong>*</strong> ANDROID USERS: look for this icon-> 
         <img class="icon" src="./images/androidAddHomeScreen.svg" alt="android" width="14" height="18"/>- then slide to the right and “Add to Home Screen.” 
         </br>
         <strong>*</strong> IOS USERS: look for this icon-> 
        <img class="icon" src="./images/iosAddHomeScreen.svg" alt="ios" width="18" height="18" />- then tap Settings on the top right and “Add to Home Screen.”</h5>
       </div>
      </div>
     </div>
    </main>
    `;

    this.el.querySelector('button.download').addEventListener('click', this.handleClick)
    const closeModal = this.el.querySelector('.close-modal')
    if (closeModal !== null) {
      closeModal.addEventListener('click', this.closeModal.bind(this));
    }
    return this.el;
  }

  unmount() {
    this.el.querySelector('button').removeEventListener('click', this.handleClick);
  }
}
