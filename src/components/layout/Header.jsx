import React from 'react'

import { NavLink } from 'react-router-dom'

import { Layout, Menu } from 'antd'

const { Header } = Layout

const HeaderLayout = () => {
    const menu = [
        { to: '/', activeClass: 'selected', name: 'Accueil' },
        { to: '/recherche', activeClass: 'selected', name: 'Recherche' },
        { to: '/favoris', activeClass: 'selected', name: 'Favoris' },
    ]
    return (
        <Header>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
                {menu.map((el, i) => {
                    return (
                        <Menu.Item key={i}>
                            <NavLink to={el.to} activeClassName={el.activeClass} exact>
                                {el.name}
                            </NavLink>
                        </Menu.Item>
                    )
                })}
            </Menu>
        </Header>
    )
}

export default HeaderLayout
