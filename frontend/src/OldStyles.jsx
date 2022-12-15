
import styled, { createGlobalStyle } from 'styled-components'

export const MainContainer = styled.div`
    width: 100%;
    height: 100%;

    padding: 5px;

    display: grid;
    grid-gap: 5px;
    grid-template-areas:
        "info    info"
        "sources libs"
        "actions actions"
    ;
`;

export const NotPluginContainer = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const DefaultContentLayout = styled.div`
    width: 100%;
    /* height: 400px; */
    padding: 2px;
    background-color: rgba(80, 80, 80, 0.8);

    border-radius: 10px;
    overflow-y: scroll;
    
    

    :hover {
        background-color: ${props => props.pluginselected === true ? 'rgba(80, 80, 80, 0.8)' : 'rgba(255, 255, 255, 0.2)'};
        cursor: ${props => props.pluginselected === true ? 'normal' : 'pointer'};
    }

    .not-plugin {
        width: 100%;
        max-width: 300px;
        height: fit-content;
        text-align: center;

        color: rgba(150, 150, 150, 1);
        font-weight: bold;
        font-size: 22px;
    }

    .not-plugin-sub {
        width: fit-content;
        height: fit-content;

        color: rgba(150, 150, 150, 1);
        font-weight: bold;
        font-size: 12px;
    }

    /* border: 4px solid rgba(80, 80, 80, 1); */
`;

export const ResumeContent = styled(DefaultContentLayout)`
    display: block;

    grid-area: info;
`;

export const ResumeContentList = styled.ul`
    width: 100%;
    /* height: 100%; */
    padding: 5px 0;
    list-style: none;

    display: flex;
    flex-direction: column;
`;

export const SourcesContent = styled(DefaultContentLayout)`
    grid-area: sources;
`;

export const LibsContent = styled(DefaultContentLayout)`
    grid-area: libs;
`;

export const ActionsContent = styled(DefaultContentLayout)`
    grid-area: actions;
`;

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: monospace;
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