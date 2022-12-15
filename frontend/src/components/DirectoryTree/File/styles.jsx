import styled from 'styled-components';

export const Container = styled.li`
    width: 100%;

    display: flex;
    flex-direction: row;

    color: whitesmoke;
    text-decoration: none;
`;

export const IconContent = styled.div`
    width:  fit-content;
    height: 100%;

    margin-right: 5px;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const TitleContent = styled.div`
    width: 100%;
    height: fit-content;

    display: flex;
    align-items: center;

    strong {
        font-weight: normal;
        font-size: 16px;
    }
`;