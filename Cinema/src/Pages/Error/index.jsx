import {Link} from 'react-router-dom';
import './error.css';

function Erro(){
    return(
        <div className="erro">
            <h1>404</h1>
            <h2>Pagina não Encontrada!!!</h2>
            <Link to="/">Veja Todos os filmes</Link>
        </div>
    )
}

export default Erro;