class Hello extends diObjectMixinBabel(React.Component) {

  constructor() {
    super();

    this.typeName = 'service-c';
    this.dependencies = ['service-b'];
    this.diReady = (serviceB) => {
      this.serviceB = serviceB;
      return this;
    }
  }

  sayHello() {
    return 'C knows that B sais: ' + this.serviceB.sayHello();
  }

  dispatchEvent(event) {
    if (this.nv) {
      this.nv.dispatchEvent(event);
    } else {
      if (!this.nvQueue) {
        this.nvQueue = [];
      }
      this.nvQueue.push(event);
    }
  }

  componentDidMount() {
    if (this.nvQueue) {
      this.nvQueue.forEach(e => this.dispatchEvent(e));
      this.nvQueue = null;
    }
  }
  render() {
    return <div
      style={{ display: 'block', border: 'solid black 1px', background: 'aquamarine', margin: '5px' }}
      ref={elem => this.nv = elem}>
      <div>Service C control</div>
    </div>;
  }
}
ReactDOM.render(
  <Hello />,
  document.getElementById("root")
)