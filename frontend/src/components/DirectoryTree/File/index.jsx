
import { BiCodeAlt } from 'react-icons/bi';
import { Container, IconContent, TitleContent } from './styles';

export default function File({ basename }) {
    return (
        <Container>
            <IconContent>
                <BiCodeAlt size="16px" />
            </IconContent>
            <TitleContent>
                <strong>{basename}</strong>
            </TitleContent>
        </Container>
    );
}