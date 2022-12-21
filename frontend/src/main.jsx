import React from 'react'
import {createRoot} from 'react-dom/client'
import App from './App'
import GlobalStyles from './Styles'
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

const container = document.getElementById('root')
const root = createRoot(container)

// root.render(
//     <React.StrictMode>
//         <GlobalStyles/>
//         <App/>
//     </React.StrictMode>
// )

root.render(
    <HashRouter>
        <Routes>
            <Route path="/" element={<Home />} exact/>
            <Route path="/plugins">
            </Route>
        </Routes>
    </HashRouter>
)

