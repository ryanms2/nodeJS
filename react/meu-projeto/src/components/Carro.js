import PropTypes from "prop-types";

function Carro({nome, ano_lancamento}) {
    return (
        <p>{nome} ano do lançamento: {ano_lancamento}</p>
    )
}

Carro.propTypes = {
    nome: PropTypes.string.isRequired,
    ano_lancamento: PropTypes.number.isRequired
}

Carro.defaultProps = {
    nome: "Faltou o nome do carro",
    ano_lancamento: 0,
}

export default Carro