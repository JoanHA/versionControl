import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import TimeAgo from 'javascript-time-ago'

import es from 'javascript-time-ago/locale/es-CO.json'
import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(es)
TimeAgo.addLocale(ru)

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)
