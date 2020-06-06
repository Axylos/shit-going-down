export default class ContactSelect {
  constructor(cb) {
    this.cb = cb;
    this.el = document.createElement('div');
  }

  listener() {
    console.log('button clicked');
    //this.cb();
  }

  render() {
    this.el.innerHTML = `
      <p>hey there</p>
      <input type="text" name="contact" />
      <button>Click Me</button>
      <button class="remove">remove</button>
    `;

    this.el.querySelector('button').addEventListener('click', this.listener);
    this.el.querySelector('button.remove').addEventListener('click', () => this.remove());

    return this.el;
  }

  remove() {
    console.log('called');
    this.el.querySelector('button').removeEventListener('click', this.listener);
  }

  unmount() {
    this.el.querySelector('input').removeEventListener('click', this.listener);
  }
}
