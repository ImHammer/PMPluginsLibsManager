import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const SobTitle = styled.p`
    width: 100%;
    
    text-align: center;
    font-family: Itim-Regular;
    font-size: 16px;
    color: #B9B9B9;
`;

export const Title = styled.h1`
    width: 100%;

    translate: 0 calc(-17%);

    text-align: center;
    font-family: Itim-Regular;
    font-size: 50px;
    color: #DBDBDB;
`;

export const SubTitle = styled.p`
    width: 100%;
    margin: 0;
    padding: 0;

    translate: 0 calc(-58%);
    
    text-align: center;
    font-family: Itim-Regular;
    font-size: 30px;
    color: #B9B9B9;
`;

export const MainContainer = styled.div`
    width: 100%;
    height: 100%;

    padding: 20px;

    display: flex;
    flex-direction: row;
`;

export const LibsContainer = styled.div`
    width: 70%;
    height: 100%;
    max-height: 294px;

    background-color: #444444;
    border-radius: 12px;
`;

export const LibsTable = styled.div`
    width: 100%;
    height: 100%;

    padding: 8px 20px;

    display: flex;
    flex-direction: column;

    color: white;
`;

export const LibsTableHead = styled.div`
    width: 100%;
    height: 10%;

    margin: 0 0 10px 0;

    display: flex;
    flex-direction: row;

    font-family: Itim-Regular;

    h3:nth-child(1) {
        width: 25%;
    }
    h3:nth-child(2) {
        width: 20%;
    }
    h3:nth-child(3) {
        width: 55%;
    }

    h3 {
        display: flex;
        position: relative;

        span {
            width: 2px;
            margin: 0 3px 0 0;
            height: 100%;
            background-color: #747474;
            display: block;
        }
    }
`;

export const LibsTableBody = styled.div`
    width: 100%;
    height: 90%;

    display: flex;
    flex-direction: column;

    font-family: Inter-Custom;
    overflow-y: scroll;
`;

// export const LibsTableItem = styled.div`
//     width: 100%;
//     /* margin: 4px 0; */
//     padding: 4px 0;

//     background-color: ${props => props.isSelected === true ? '#4F4F4F' : 'transparent'};

//     display: flex;
//     flex-direction: row;

//     cursor: pointer;

//     div:nth-child(1) {
//         width: 25%;
//     }
//     div:nth-child(2) {
//         width: 20%;
//     }
//     div:nth-child(3) {
//         width: 55%;
//     }

//     div {
//         text-overflow: ellipsis;
//         overflow-x: hidden;
//         padding: 0 0 0 6px;
//     }

//     :hover {
//         background-color: #4F4F4F;
//     }
// `;

export const ActionsContainer = styled.div`
    width: 30%;
    height: 100%;
`;

export const ButtonsList = styled.ul`
    width: 100%;
    height: 100%;

    padding: 0 0 0 10px;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    row-gap: 10px;
`;

export const ActionButton = styled.button`
    width: 100%;
    height: 50px;

    background-color: ${props => props.unlocked === false ? '#404040' : '#4F4F4F'};

    border: none;
    border-radius: 12px;

    color: ${props => props.unlocked === false ? '#858585' : 'white'};
    font-size: 18px;
    font-family: Itim-Regular;

    cursor: ${props => props.unlocked === false ? 'not-allowed' : 'pointer'};

    :hover {
        background-color: ${props => props.unlocked === false ? '#404040' : '#5F5F5F'};
    }
`;

export const AddLibraryTitle = styled.h1`
    width: 100%;

    font-family: Itim-Regular;
    font-size: 18px;
    font-weight: normal;

    text-align: center;
    text-decoration: none;
    
    color: #B9B9B9;
`;

export const TinyTitle = styled.p`
    width: 100%;

    font-family: Itim-Regular;
    font-size: 14px;

    text-align: center;
    text-decoration: none;
    color: #B9B9B9;
`;

export const AddLibraryBackdrop = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);

    position: fixed;
    top: 0;
    left: 0;
    
    display: ${props => props.show ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;

    z-index: 10;
`;

export const AddLibraryContainer = styled.div`
    width: 500px;
    height: 269px;
    background-color: #444444;

    border-radius: 12px;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Form = styled.div`
    width: 100%;
    height: 100%;

    padding: 10px 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;


export const DoubleInputContent = styled.div`
    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;

    column-gap: 6px;
`;


export const BrowserButton = styled.button`
    width: 24%;
    height: 30px;
    background-color: #5E5E5E;

    border: none;
    border-radius: 4px;

    font-weight: Itim-Regular;
    font-size: 12px;

    text-align: center;
    text-decoration: none;
    color: #B9B9B9;

    cursor: pointer;
    :hover {
        background-color: #626262;
    }
`;

export const AddButton = styled.button`
    width: 100px;
    height: 30px;
    background-color: ${props => props.unlocked === true ? '#4F4F4F' : '#404040'};

    border: none;
    border-radius: 4px;

    font-weight: Itim-Regular;
    font-size: 14px;

    text-align: center;
    text-decoration: none;

    color: ${props => props.unlocked === true ? 'white' : '#858585'};

    cursor: ${props => props.unlocked === true ? 'pointer' : 'not-allowed'};
    :hover {
        background-color: ${props => props.unlocked === true ? '#5F5F5F' : '#404040'};
    }
`;

export const InputGroupContainer = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
`;

export const LibraryInputTitle = styled.p`
    width: fit-content;
    height: fit-content;

    font-family: Itim-Regular;
    font-size: 16px;

    text-align: left;
    text-decoration: none;

    color: #B9B9B9;
`;

export const LibraryInput = styled.input`
    width: 100%;
    height: 30px;
    background-color: #777777;

    padding-left: 5px;

    border: none;
    border-radius: 4px;
    
    font-family: Itim-Regular;
    font-size: 18px;

    color: white;
`;
