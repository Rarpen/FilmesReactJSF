import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './favoritos.css';
import { toast } from 'react-toastify';

function Favoritos(){
    const [filmes, setFilmes] = useState([]);

    useEffect(()=> {
        
        const minhaLista = localStorage.getItem('@filmes');
        setFilmes(JSON.parse(minhaLista) || []);

    },[])

    function excluir(id){
        let filtroFilmes = filmes.filter((item)=>{
            return(item.id !== id)
        })

        setFilmes(filtroFilmes);
        localStorage.setItem('@filmes',JSON.stringify(filtroFilmes));
        toast.success("Filme excluído com sucesso");
    }

    return(
        <div className="meus-filmes">
            <h1>Filmes Favoritos</h1>

            {filmes.length === 0 && <span>Você não possui nenhum filme salvo</span>}

            <ul>
                {filmes.map((item)=>{
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Detalhes do filme</Link>
                                <button onClick={() => excluir(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>

        </div>
    )
}

export default Favoritos;