import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import TimeAgo from 'javascript-time-ago'
// import 'rsuite/dist/rsuite.min.css'
import es from 'javascript-time-ago/locale/es-CO.json'
import ru from 'javascript-time-ago/locale/ru.json'
import { CustomProvider } from 'rsuite';
TimeAgo.addDefaultLocale(es)
TimeAgo.addLocale(ru)

ReactDOM.createRoot(document.getElementById('root')).render(
    <CustomProvider theme="dark">
        <App />
    </CustomProvider>
)
