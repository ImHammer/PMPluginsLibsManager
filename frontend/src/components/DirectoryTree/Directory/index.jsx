
import { useState } from 'react';
import { AiFillCaretDown, AiFillCaretRight } from 'react-icons/ai';
import {
    Container,
    TitleContainer,
    FilesListContent,
    IconContent,
    TitleContent
} from './styles';

export default function Directory({ basename, children }) {
    
    const [expanded, setExpanded] = useState(false);

    function toggleExpand() {
        setExpanded(() => (expanded === false));
    }

    return (
        <Container>
            <TitleContainer onClick={toggleExpand}>
                <IconContent>
                    {
                        expanded
                        ? <AiFillCaretDown  size="18px" />
                        : <AiFillCaretRight size="18px" />
                    }
                </IconContent>
                <TitleContent>
                    <strong>{basename}</strong>
                </TitleContent>
            </TitleContainer>
            <FilesListContent expanded={expanded}>
                { children }
            </FilesListContent>
        </Container>
    );
}