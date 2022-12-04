
import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    height: 100%;
    grid-area: info;
`;

export const ListContent = styled.ul`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    
    list-style: none;
`;

export const ListItemContent = styled.li`
    width: 100%;

    display: flex;
    flex-direction: row;
    flex-grow: 10px;
`;

export const ListItemKey = styled.strong`
    width: 100%;
    max-width: 100px;


`;

export const ListItemValue = styled.p`

`;