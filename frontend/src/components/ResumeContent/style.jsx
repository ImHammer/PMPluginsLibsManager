import styled from 'styled-components'

export const Content = styled.li`
    width: 100%;
    padding: 0 4px;
    margin: 4px 0;

    border-radius: 4px;
    background-color: ${ props => props.expanded ? "rgba(255, 255, 255, 0.1)" : "transparent"};

    display: flex;
    flex-direction: column;

    cursor: pointer;

    :hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;

export const HeaderContent = styled.div`
    width: 100%;
    height: 100%;
    
    display: flex;
    flex-direction: row;
`; 

export const Title = styled.strong`
    width: 50%;
    color: whitesmoke;
    font-size: 15px;
`;

export const Text = styled.p`
    width: 50%;
    color: whitesmoke;
    font-size: 15px;
    text-align: right;
`;

export const ExpandContent = styled.ul`
    width: 100%;
    max-height: ${ props => props.expanded ? "55px" : "0" };
    overflow-y: hidden;

    list-style: none;

    display: flex;
    flex-direction: column;

    overflow-y: scroll;
    scrollbar-width: unset;

    transition: max-height 0.1s ease-in-out;
`;

export const ExpandItem = styled.li`
    width: 100%;
    height: fit-content;

    font-size: 14px;
    color: whitesmoke;
`;