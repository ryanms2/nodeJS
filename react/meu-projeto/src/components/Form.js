import { useState } from "react";

function Form() {
    function Enviar(event) {
        event.preventDefault();
        console.log(`cadastrado com sucesso ${name} e senha ${password}`);
    }

    const [name, setName] = useState()
    const [password, setPassword] = useState()

    return (
        <form onSubmit={Enviar}>
            <div>
                <label htmlFor="name">Nome:</label>
                <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)}></input>
            </div>
            <div>
               <label htmlFor="password">Senha:</label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            
            <button type="submit">Enviar</button>
        </form>
    )
}

export default Form