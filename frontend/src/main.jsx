import React from 'react'
import {createRoot} from 'react-dom/client'
import App from './App'
import { createGlobalStyle } from 'styled-components'

const container = document.getElementById('root')

const root = createRoot(container)

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: sans-serif;
    }

    #root {
        width: 100%;
        height: 100vh;
    }
`;

root.render(
    <React.StrictMode>
        <GlobalStyles/>
        <App/>
    </React.StrictMode>
)
