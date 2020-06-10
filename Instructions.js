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
  }

  handleClick() {
    console.log('go to next page');
    this.goToNext();
  }

  setTimeout() {
    window.setTimeout(() => {
      this.contentAnimation()
    }, 100);
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
      duration: 1.5,
      opacity: 0,
      delay: 0.1
    });
    // tl.to(".loading-screen", {
    //   opacity: 1,
    //   delay: 0.5,
    //   duration: 1.5,
    // });
    tl.set(".loading-screen", { opacity: 0 })
  }

  contentAnimation() {
    let tl = gsap.timeline();
    // tl.from(".animate-this", {
    //   duration: 0.6,
    //   y: -140,
    //   opacity: 0,
    //   stragger: 0.9,
    //   delay: 0.3
    // });
    tl.to(".animate-this", {
      duration: 0.7,
      opacity: 1,
      stragger: 0.9,
      // y: -60,
      // delay: 0.3
    });
    // tl.from(".animate-text", {
    //   duration: 1.2,
    //   opacity: 0
    // });
    // tl.to(".animate-text", {
    //   opacity: 0.7,
    //   duration: 0.2,
    // });
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

  handleClick() {
    console.log('go to next page');
    this.goToNext();
  }

  render() {
    this.el.innerHTML = `
    <main data-barba="container" data-barba-namespace="instruction-section">
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
    <button class="demo">next</button>

    </main>
    `;

    this.el.querySelector('button').addEventListener('click', this.handleClick)

    return this.el;
  }

  unmount() {
    this.el.querySelector('button').removeEventListener('click', this.handleClick);
  }
}
