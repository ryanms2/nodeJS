import Button from "./evento/Button"

function Evento() {
    function Primeiro() {
        console.log("primeiro botao acionado")
    }

    function Segundo() {
        console.log("Segundo botao acionado")
    }

    return (
        <div>
            <p>Clique para disparar o evento</p>
           <Button event={Primeiro} text="Primeiro evento"/>
           <Button event={Segundo} text="Segundo evento"/>
        </div>
        
    )
}

export default Evento