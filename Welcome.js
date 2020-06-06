export default class Welcome {
  constructor() {
    console.log('instantiating a welcome view');
  }

  render() {
    const el = document.createElement('div');
    el.innerHTML = `
    <div>
      <h2>Welcome to Call Bail Me</h2>
    </div>
    `;

    return el;
  }
}
