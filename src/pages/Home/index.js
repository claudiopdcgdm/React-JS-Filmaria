import api from '../../services/api'
import './home.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Home() {
    //inicializa state filmes com  array vazia
    const [filmes, setFilmes] = useState([]);

    //ciclo do didMount
    //busca os dados da api filmes
    useEffect(() => {

        async function loadFilmes() {
            const response = await api.get('r-api/?api=filmes/')
            console.log(response.data)
            setFilmes(response.data)
        }
        loadFilmes();
    }, [])


    return (
        <div className='container' >
            <div className='lista-filmes' >
                {filmes.map((item) => {
                    return (
                        <article key={item.id}>
                            <strong> {item.nome} </strong>
                            <img src={item.foto} alt={item.nome} />
                            <Link to={`/sobre/filme/${item.id}`}>Assitir</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Home