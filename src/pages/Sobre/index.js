import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';
import api from '../../services/api'
import './sobre.css'



export default function Sobre() {

    //obtem o parametro informado na URL
    const { id } = useParams();

    //obtem o historico de navegação do browser
    const history = useHistory()

    const [filme, setFilme] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadFilmeInfo() {
            const response = await api.get(`/r-api/?api=filmes/${id}`)
            //console.log(response.data)

            //tentativa de acesar um id que não existe
            if (response.data.length === 0) {
                history.replace('/')
                return
            }

            setFilme(response.data)
            setLoading(false)
        }

        loadFilmeInfo()

        //evento un-mount
        return () => {
            console.log('Componente desmontado')
        }

    }, [history, id])

    function salvaFilme() {
        const listaSalva = localStorage.getItem('filmes-salvos')

        //recebe lista de filmes salvos ou vazio se lista tiver vazia
        //convertendo de STR para JSON
        let filmesSalvos = JSON.parse(listaSalva) || []

        //verifica se filme clicado já existe na listaSalva
        //funcão .some percorre e compara o id passado com os da lista
        //retorna True ou False
        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)
        if (hasFilme) {
            toast.warn('Filme já foi salvo anteriormente')
            return
        }

        //adiciona o filme clicado na lista
        //e salva no localstorage convertendo em texto(String)
        filmesSalvos.push(filme)
        localStorage.setItem('filmes-salvos', JSON.stringify(filmesSalvos))
        toast.success(`Filme ${filme.nome} salvo com sucesso`)


    }

    if (loading) {
        return (
            <div className='filme-info' >
                <h1>Carregando......</h1>
            </div>
        )
    }


    return (
        <div className='filme-info' >
            <h1>{filme.nome}</h1>
            <img src={filme.foto} alt={filme.nome} />
            <h4>{filme.sinopse}</h4>

            <div className='btn' >
                <button onClick={salvaFilme} >Salvar</button>
                <button>
                    <a target='blank' href={`https://youtube.com/results?search_query=${filme.nome} Trailer`}>
                        Trailer
                        </a>
                </button>
            </div>
        </div>
    );
}
