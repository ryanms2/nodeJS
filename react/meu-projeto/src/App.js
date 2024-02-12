import './App.css';
import HelloWorld from "./components/HelloWorld";
import Pessoa from "./components/Pessoa";

function App() {

  const nome = "Rian"
  const idade = 19
  return (
    <div className="App">
      <HelloWorld/>
      <Pessoa nome={nome} idade={idade}/>
    </div>
  );
}

export default App;
