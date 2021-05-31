import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Sobre from './pages/Sobre'
import Favoritos from './pages/Favoritos'
import Header from './components/Header'
import Pagenotfound from './pages/PageNotFound'


const Routes = () => {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/Sobre/filme/:id' component={Sobre} />
                <Route exact path='/Favoritos/' component={Favoritos} />
                <Route path='*' component={Pagenotfound} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes