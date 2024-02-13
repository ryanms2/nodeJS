import './App.css';
import HelloWorld from "./components/HelloWorld";
import Pessoa from "./components/Pessoa";
import Form from "./components/Form";
import Evento from "./components/Evento"
import Condicional from './components/Condicional';
import OutraLista from './components/OutraLista';
function App() {

  const nome = "Rian"
  const idade = 19

  const itens = ['mamao', 'mostarda', 'file']
  return (
    <div className="App">
      <HelloWorld/>
      <Pessoa nome={nome} idade={idade}/>
      <Form/>
      <Evento/>
      <Condicional/>
      <OutraLista itens={itens}/>
    </div>
  );
}

export default App;