import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: fit-content;

    margin: 5px 0;
    padding: 5px;
    border-radius: 5px;

    max-width: 600px;
    max-height: 200px;

    overflow-y: scroll;

    background-color: ${props => props.color};
`;

export const Header = styled.div`
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const Title = styled.h4`
    width: 100%;

    font-size: 18px;
    color: white;
`;

export const CloseContent = styled.div`
    width: fit-content;
    height: fit-content;

    cursor: pointer;

    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

export const Body = styled.div`
    width: 100%;
`;
