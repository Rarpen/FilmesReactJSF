import './Header.css';
import { Link } from 'react-router-dom';

function Header(){
    return(
        <header>
                <Link className='logo' to='/'>Refilx Filmes</Link>
                <Link className='favoritos' to="/favoritos">Meus Favoritos</Link>
        </header>
    )
}

export default Header;