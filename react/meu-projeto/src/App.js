import './App.css';
import HelloWorld from "./components/HelloWorld";

function App() {

  function sum(a, b) {
    return a + b
  }


  return (
    <div className="App">
      <h1>Meu primeiro app</h1>
      <p>a soma é {sum(2, 2)}</p>
      <p>hehehe</p>
      <HelloWorld/>
    </div>
  );
}

export default App;
