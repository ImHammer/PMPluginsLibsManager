import styled from 'styled-components';

export const Container = styled.li`
    width: 100%;

    cursor: pointer;
`;

export const TitleContainer = styled.div`
    width: 100%;
    background-color: transparent;

    display: flex;
    flex-direction: row;

    color: rgb(200, 200, 200);

    :hover {
        background-color: rgba(255, 255, 255, 0.2);
        text-decoration: underline;
    }
`;

export const FilesListContent = styled.ul`
    width: 100%;
    height: 100%;

    max-height: ${props => props.expanded === true ? '500px' : '0'};
    overflow-y: hidden;

    padding-left: 20px;
    list-style: none;
`;

export const IconContent = styled.div`
    width:  fit-content;
    height: 100%;

    margin-right: 3px;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const TitleContent = styled.div`
    width: 100%;
    
    display: flex;
    align-items: center;

    strong {
        font-size: 16px;
        font-weight: normal;
    }
`;
