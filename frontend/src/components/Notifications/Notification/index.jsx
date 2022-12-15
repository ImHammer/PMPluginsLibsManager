
import { IoMdClose } from 'react-icons/io';
import { Body, CloseContent, Container, Header, Title } from './styles';

const colors = {
    danger: '#ff3333',
    warning: '#ffd11a',
    success: '#66ff33'
};

export default function Notification({ title, body, type, onCloseNotify }) {

    const color = colors[type] ?? '#ffffff';

    return (
        <Container color={color}>
            <Header>
                <Title>{title}</Title>
                <CloseContent onClick={onCloseNotify}>
                    <IoMdClose size="32px" color="#000000" />
                </CloseContent>
            </Header>
            <Body>{body}</Body>
        </Container>
    );
}