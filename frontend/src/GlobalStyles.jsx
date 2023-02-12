
import { createGlobalStyle } from 'styled-components'

import ItimFont from './fonts/Itim/Itim-Regular.ttf'
// import InterFont from './fonts/Inter/Inter-VariableFont_slnt,wght.ttf'
import InterFont from './fonts/Inter/static/Inter-Light.ttf'

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    @font-face {
        font-family: 'Itim-Regular';
        src: local('Itim-Regular'), url(${ItimFont}) format('truetype');
    }

    @font-face {
        font-family: 'Inter-Custom';
        src: local('Inter-Custom'), url(${InterFont}) format('truetype');
    }

    #root {
        width: 100%;
        height: 100vh;
    }

    body {
        background-color: rgba(54, 54, 54, 1);
        /* background-color: transparent; */
    }
`;

export default GlobalStyles