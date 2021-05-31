import { Link } from 'react-router-dom'
import './pagenotfound.css'

export default function Pagenotfound() {
    return (
        <div className='page-not-found'>
            <h1>404</h1>
            <h2>Pagina não Encontrada</h2>
            <Link to='/'>Voltar a HOME</Link>

        </div>
    );
}
