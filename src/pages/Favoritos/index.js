import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import './favoritos.css'

export default function Favoritos() {
    const [filmes, setfilmes] = useState([])

    useEffect(() => {
        const listaFilmesSalvos = localStorage.getItem('filmes-salvos')
        setfilmes(JSON.parse(listaFilmesSalvos) || [])

    }, [])

    function handleDelete(filme_id) {

        //seleciona todos os filmes menos akele que seja igual ao id passodo
        let filtroFilme = filmes.filter((item) => {
            return (item.id !== filme_id)
        })

        setfilmes(filtroFilme)
        localStorage.setItem('filmes-salvos', JSON.stringify(filtroFilme))
        toast.success('Removido com sucesso')
    }

    // if (filmes.length === 0) {
    //     return (
    //         <div>
    //             <h1>Nenhum Filme Salvo!</h1>
    //         </div>
    //     )
    // }

    return (
        <div id='filmes-salvos'>
            <h1>Meus Filmes Favoritos</h1>

            {filmes.length === 0 && <span>Nenhum filme salvo :( </span>}

            <ul>
                {filmes.map((item) => {
                    return (
                        <li key={item.id}>
                            <span>{item.nome}</span>

                            <div>
                                <Link to={`/Sobre/filme/${item.id}`}>Detalhes</Link>
                                <button onClick={() => handleDelete(item.id)} >Excluir</button>
                            </div>
                        </li>

                    )
                })}
            </ul>

        </div>
    );
}
