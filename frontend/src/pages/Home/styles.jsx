import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    width: 100%;
    height: 100%;

    background-color: #373737;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Title = styled.h1`
    font-size: 80px;
    font-family: 'Itim-Regular';
    color: white;
`;

export const OpenPluginContainer = styled.div`
    width: 90%;
    height: 80%;
    
    background-color: #4F4F4F;
    margin-top: 8px;
    border-radius: 12px;

    display: flex;
    justify-content: center;
    align-items: center;

    font-family: sans-serif;
    font-size: 50px;
    color: #ACACAC;
    
    cursor: pointer;

    :hover {
        background-color: #5F5F5F;
    }
`;

export const ExternalLinksContainer = styled.div`
    width: 100%;
    height: 20%;

    background-color: transparent;
    
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ExternalLinkContent = styled.a`
    width: 45px;
    height: 45px;

    background-color: #535353;
    margin: 0 5px;
    border-radius: 5px;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 24px;
    color: white;

    cursor: pointer;
    
    :hover {
        background-color: #5F5F5F;
    }
`;

export const LoadingContainer = styled.div`
    width: 100%;
    height: 100%;

    background-color: rgba(0, 0, 0, 0.62);

    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    top: 0;
    left: 0;

    cursor: wait;
`;

export const LoadingContent = styled.div`
    width: 476px;
    height: 269px;

    background-color: #444444;
    border-radius: 12px;

    text-align: center;
    font-family: sans-serif;
    font-size: 36px;
    color: #ACACAC;

    display: flex;
    justify-content: center;
    align-items: center;
    
    cursor: wait;
`;
