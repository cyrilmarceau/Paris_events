import React from 'react'

import { NavLink } from 'react-router-dom'

import { Layout, Menu } from 'antd'

import { HomeOutlined, SearchOutlined, StarOutlined } from '@ant-design/icons'

const { Header } = Layout

const HeaderLayout = () => {
    const menu = [
        { to: '/', activeClass: 'selected', name: 'Accueil', icon: <HomeOutlined /> },
        {
            to: '/recherche',
            activeClass: 'selected',
            name: 'Recherche',
            icon: <SearchOutlined />,
        },
        { to: '/favoris', activeClass: 'selected', name: 'Favoris', icon: <StarOutlined /> },
    ]
    return (
        <Header>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
                {menu.map((el, i) => {
                    return (
                        <Menu.Item key={i} icon={el.icon}>
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
