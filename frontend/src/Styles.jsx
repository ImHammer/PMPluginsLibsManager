
import styled, { createGlobalStyle } from 'styled-components'

export const MainContainer = styled.div`
    width: 100%;
    height: 100%;

    padding: 5px;

    display: flex;
    flex-direction: column;
`;

export const NotPluginContainer = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const DefaultContainerLayout = styled.div`
    width: 100%;
    height: 100%;
    padding: 2px;
    background-color: rgba(80, 80, 80, 0.8);

    margin: 3px;

    border-radius: 10px;

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
`;

export const CenterContainer = styled.div`
    width: 100%;
    height: 100%;

    margin: 0 0 6px 0;

    display: flex;
    flex-direction: row;
`;

export const SectionContentTitle   = styled.div`
    width: 100%;

    text-align: center;
    font-weight: bolder;
    font-size: 22px;
    color: rgb(210, 210, 210);
`;

export const SectionContentContent = styled.div`
    width: 100%;
    height: 200px;

    overflow-y: scroll;
`;


export const ResumeContainer = styled(DefaultContainerLayout)`
`;

export const ResumeContainerList = styled.ul`
    width: 100%;
    height: 100%;

    padding: 5px 0;
    list-style: none;

    display: flex;
    flex-direction: column;
`;

export const SourcesContainer = styled(DefaultContainerLayout)`
`;

export const LibsContainer = styled(DefaultContainerLayout)`
`;

export const ActionsContainer = styled(DefaultContainerLayout)`
`;

export const NotificationContainer = styled.div`
    width: 100%;
    height: 100%;
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