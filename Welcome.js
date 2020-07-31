export default class Welcome {
  constructor(goToNext) {
    this.handleClick = this.handleClick.bind(this);
    this.el = document.createElement('div');
    this.el = document.createElement('div');
    this.goToNext = goToNext;
    // this.verifiedFailed = verifiedFailed;
    // this.goToNext = goToNext;
    // this.delay = this.delay.bind(this);
    // this.pageTransition = this.pageTransition.bind(this);
    // this.contentAnimation = this.contentAnimation.bind(this);
    // this.initAnimation = this.initAnimation.bind(this);
    // this.setTimeout();
  }

  handleClick() {
    console.log('go to next page');
    this.goToNext();
  }

  handleVerifiedFailure() {
    if (!this.verifiedFailed) {
      const node = document.createElement('div');
      node.classList.add('alert');
      node.innerHTML = `
        Uh Oh! It looks like you are offline <br />
        Log In Please Before Continuing <br />
        <button class="close-modal">Ok I'm connected</button>
      `
      node.addEventListener('click', ev => {
        const node = this.el.querySelector('.alert');
        node.remove();
      });

      this.verifiedFailed = false;
      this.el.prepend(node);
    }
  }

  // setTimeout() {
  //     window.setTimeout(() => {
  //       this.pageTransition();
  //       this.contentAnimation();
  //       window.setTimeout(() => {
  //         this.goToNext();
  //       }, 3200)
  //     }, 1200);
  // }

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
      duration: 1.8,
      width: "100%",
      top: "0",
      ease: "Expo.easeInOut"
    });

    tl.to(".loading-screen", {
      duration: 2,
      width: "100%",
      top: "100%",
      ease: "Expo.easeInOut",
      // delay: 0.1
    });
    tl.set(".loading-screen", { top: "-100%" })
  }

  contentAnimation() {
    let tl = gsap.timeline();
    tl.from(".animate-this", {
      duration: 1,
      y: 1,
      opacity: 1,
     
      delay: 1
    });
    tl.to(".animate-this", {
      opacity: 0,
      y: 50,
    })
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

  render() {
    this.el.innerHTML = `
    <main data-barba="container" data-barba-namespace="home-section">
     
    <div class="animationPage">
        <div class="textHome animate-this">
          <div class="titlediv "> 
              <div class="divInsta"> 
                <p class='homeInstructionOne'> Contact your friends at the push of a button</br> <strong>in case</strong></p>
              </div>
              <div class="mainTitle">
                <h2 class="shit">SHIT GOING <span class="shit down">DOWN</span></h2>
              </div>
          </div>
        </div>
      </div>

      <div class="loginSection">
          <div class"loginDiv">
            <div class="buttonDiv">
              <button class="btnLogin sms" onclick="location.href='/sms'">
                <span class='loginInstruction'>to manuly save & SMS friends.</span></br>
              </button>
              <button class="btnLogin twitter" onclick="location.href='https://www.shitgoingdown.com/api/login'">
                <span class='loginInstruction'>to DM twitter contacts.</span></br>
              </button>
            </div>
            <div class-"text">
              <p class='loginInstructionTwo'>Your information & activties will not be shared outside this application
              & are not stored anywhere in this application. </p>
            </div>
            <div class-"text add">
            <p class='loginInstructionTwo add'>It's recommended adding the app to your mobile home screen, so you locate it quickly in case of an emergency. It is easy to do that through your phone menu - <a class="how" href="https://natomasunified.org/kb/add-website-to-mobile-device-home-screen/"> here is how.</a> </p>
          </div>  

        </div>
      </div>
    </main>
    `;
    return this.el;
  }

  unmount() { }
}
