import Live from 'src/components/live';

const componentClassExample = `
  class Counter extends React.Component {
    constructor() {
      this.state = { count: 0 }
    }
    componentDidMount() {
      this.interval = setInterval(() => {
        this.setState(state => ({ count: state.count + 1 }))
      }, 1000)
    }
    componentWillUnmount() {
      clearInterval(this.interval)
    }
    render() {
      return (
        <center>
          <h3>
            {this.state.count}
          </h3>
        </center>
      )
    }
  }
`.trim();

const App = () => {
  return (
    <div className="w-screen px-8">
      <div className="py-4 prose">
        <h2>实时渲染编辑器</h2>
        <h4>支持渲染类型</h4>
        <ul>
          <li>
            React elements, e.g. <strong>Hello World!</strong>
          </li>
          <li>
            React pure functional components, e.g. () ={'>'} <strong>Hello World!</strong>
          </li>
          <li>React functional components with Hooks</li>
          <li>React component classes</li>
          <li>Just some JSX code!</li>
          <li>...</li>
        </ul>
      </div>
      <div className="prose mb-2">
        <h3>编辑器</h3>
      </div>
      <Live code={componentClassExample} />
    </div>
  );
};

export default App;
