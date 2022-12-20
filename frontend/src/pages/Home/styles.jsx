import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Header = styled.header`
    width: 100%;
    height: fit-content;

    display: flex;
    flex-direction: column;

    align-items: center;
`;

export const Title = styled.h3`
    width: fit-content;
    height: fit-content;
    
    text-align: center;
    font-family: sans-serif;
`;
export const Description = styled.p`
    width: fit-content:
    height: fit-content;
    
    text-align: center;
    font-family: sans-serif;
`;
export const Separator = styled.hr`
    width: 80%;
    height: 1px;

    background-color: rgba(100, 100, 100, 0.5)
`;
export const Main = styled.main`
    width: 100%;
    height: 100%;
`;

export const ActionsContent = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ActionsContentTitle = styled.h5`
    width: fit-content;
    height: fit-content;

    color: white;
    font-family: sans-serif;
`;

export const ActionsContentButtons = styled.div`
    width: 100%:
    height: 100%:

    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ActionsContentButton = styled.a`
    width: 100px;
    height: 50px;

    background-color: rgb(80, 80, 80);
    color: white;

    border-radius: 8px;

    text-decoration: none;
    font-family: sans-serif;

    cursor: pointer;

    :hover {
        background-color: rgb(100, 100, 100);
    }
    active:active {
        position:relative;
        top:1px;
    }
`;
