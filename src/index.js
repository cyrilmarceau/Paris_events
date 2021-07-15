import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

import reportWebVitals from './reportWebVitals'

import { ConfigProvider } from 'antd'

import frFR from 'antd/lib/locale/fr_FR'

import './main.scss'

ReactDOM.render(
    // <React.StrictMode>
    <ConfigProvider locale={frFR}>
        <App />
    </ConfigProvider>,
    // </React.StrictMode>,
    document.getElementById('root')
)

reportWebVitals()
