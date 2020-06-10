export default class Welcome {
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

  setTimeout(){
    window.setTimeout(() => {
      this.pageTransition();
      this.contentAnimation();
      window.setTimeout(() => {
        this.goToNext();
      }, 3200)
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
    tl.set(".loading-screen", {top: "-100%"})
  }

  contentAnimation() {
    let tl = gsap.timeline();
    tl.from(".animate-this", {
      duration: 1,
      y: 1,
      opacity: 1,
      stragger: 0.9,
      delay: 1
    });
    tl.to(".animate-this", {
      opacity: 0,
      y: 50,
    })
  }

initAnimation(){
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
        <p class='homeInstructionOne'> Contact emergency friends & local bail funds </br>at the push of a button
       </br> <strong>in case</strong></p>
        <h1 class="shit">SHIT</h1>
        <h1 class="going">GOING</h1>
        <h1 class="down">DOWN</h1>
      </div>
    </div>
    </main>
    `;

  
    return this.el;
  }

  unmount() {
   
  }
}
