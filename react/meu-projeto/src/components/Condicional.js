import { useState } from "react";

function Condicional() {

    function enviarEmail(e) {
        e.preventDefault()
        setUserEmail(email)
    }

    function limparEmail() {
        setUserEmail("")
    }

    const [email, setEmail] = useState()
    const [userEmail, setUserEmail] = useState()
    return (
        <div>
            <h3>Digite o seu email</h3>
            <form>
                <label htmlFor="email">email:</label>
                <input type="email" id="email" name="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <button type="submit" onClick={enviarEmail}>Enviar</button>
                {userEmail && (
                    <div>
                        <p>O e-mail do usuario é: {userEmail}</p>
                        <button onClick={limparEmail}>Limpar o e-mail</button>
                    </div>
                )}
            </form>
        </div>
    )
}

export default Condicional