import React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Layout } from 'antd'

import Home from './views/Home'
import Favorites from './views/Favorites'
import Search from './views/Search'
import Detail from './views/Detail'

import HeaderLayout from './components/layout/Header'

const { Content } = Layout

const App = () => {
    return (
        <Router basename="/paris-event/">
            <Layout>
                <HeaderLayout />
                <Content>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/recherche" component={Search} />
                        <Route path="/favoris" component={Favorites} />
                        <Route path="/detail" component={Favorites} />
                        <Route path="/event/:id" component={Detail} />
                    </Switch>
                </Content>
            </Layout>
        </Router>
    )
}

export default App
