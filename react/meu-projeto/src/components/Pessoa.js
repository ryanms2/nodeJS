import styles from "./Pessoa.module.css"
import Itens from "./Itens"
import Carro from "./Carro"

function Pessoa({nome, idade}) {
    return <div>
        <h4 className={styles.PessoaContent}>Seja bem vindo {nome}!!, sua idade é: {idade}</h4>
        <Carro nome="UNO" ano_lancamento={1985} />
        <Itens item1="Melancia" item2="agua"/>
    </div>
}

export default Pessoa