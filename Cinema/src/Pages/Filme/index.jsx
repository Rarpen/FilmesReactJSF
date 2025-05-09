import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../Services/Api';
import './filme.css';
import { toast } from 'react-toastify'; 

function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme() {
            try {
                const response = await api.get(`/movie/${id}`, {
                    params: {
                        api_key: "48fe826f5343dbec1255bc2dfbb0f218",
                        language: "pt-BR",
                    }
                });
                setFilme(response.data);
                setLoading(false);
            } catch (error) {
                console.log("Erro ao buscar filme", error);
                navigate("/", {replace: true});
                return;
            }
        }

        loadFilme();

        return () => {
            console.log("Componente desmontado");
        };
    }, [id]);

    function salvarFilme() {
        const minhaLista = localStorage.getItem('@filmes');
        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id); 

        if(hasFilme){
            toast.warn("Filme já salvo");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('@filmes', JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso");

    }

    if (loading) {
        return (
            <div className='filme-info'>
                <h1>Carregando filme...</h1>
            </div>
        );
    }

    return (
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliacao: {filme.vote_average} / 10</strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
        <a target='blank' rel='external' href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Traile</a>
                </button>
            </div>
        </div>
        
    );
}

export default Filme;
