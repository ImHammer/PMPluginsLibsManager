
import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    /* margin: 4px 0; */
    padding: 4px 0;

    /* background-color: ${props => props.isSelected === true ? '#4F4F4F' : 'transparent'}; */
    background-color: ${props => props.forRemove === true ? 'rgb(200, 80, 80)' : props.isSelected === true ? '#4F4F4F' : 'transparent'};

    display: flex;
    flex-direction: row;

    cursor: pointer;

    :hover {
        background-color: ${props => props.forRemove === true ? 'rgb(200, 80, 80)'  : '#4F4F4F'};
    }
`;

const TitleContent = styled.div`
    text-overflow: ellipsis;
    overflow-x: hidden;
    padding: 0 0 0 6px;
`;

export const TitleName = styled(TitleContent)`
    width: 25%;
`;
export const TitleVersion = styled.div`
    width: 20%;
`;
export const TitleNamespace = styled.div`
    width: 55%;
`;