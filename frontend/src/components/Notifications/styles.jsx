import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;

    background-color: rgba(0, 0, 0, 0.8);

    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    flex-direction: column;
    align-items: center;

    overflow-y: scroll;
`;