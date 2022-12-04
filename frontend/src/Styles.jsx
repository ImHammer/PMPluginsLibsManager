
import styled from 'styled-components'

export const MainContainer = styled.div`
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-areas:
        "info    info"
        "source  libs"
        "actions actions"
    ;
`;
