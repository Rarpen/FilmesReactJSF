import { useEffect, useState } from 'react';
import api from '../../Services/Api';
import { Link } from 'react-router-dom';
import './home.css';



function Home() {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);    

    useEffect(() => {
        async function loadFilmes() {
            try {
                const response = await api.get("movie/now_playing", {
                    params: {
                        api_key: "48fe826f5343dbec1255bc2dfbb0f218",
                        language: "pt-BR",
                        page: 1,
                    },
                });

                // Corrigindo a atualização do estado
                setFilmes(response.data.results.slice(0, 12));
                setLoading(false);
                console.log(response.data.results.slice(0, 12));
            } catch (error) {
                console.error("Erro ao buscar filmes:", error);
            }
        }

        loadFilmes();
    }, []);

    if(loading){
        return(
            <div className="loading">
                <h2>Carregando filme... Por favor aguarde</h2>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((item) => (
                    <article key={item.id}>
                        <strong>{item.title}</strong>
                        <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item.title} />
                        <Link to={`/filme/${item.id}`}>Acessar</Link>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default Home;
