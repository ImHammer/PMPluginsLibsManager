
import { useEffect, useState } from 'react';
import {
    Content,
    ExpandItem,
    ExpandContent,
    HeaderContent,
    Title,
    Text
} from './style';

export default function ResumeItemComponent({ title, text, items }) {
    const [expanded, setExpand] = useState(false);

    const hasItems = () => (items !== undefined && items.length !== undefined && items.length > 0);

    if (hasItems()) {
        items = items.map((itemText) => {
            return <ExpandItem key={itemText}>» {itemText}</ExpandItem>
        })
    }

    function changeExpanded() {
        if (expanded) {
            setExpand(() => false);
        } else  {
            setExpand(() => true);
        }
    }

    return (
        <Content onClick={changeExpanded} expanded={expanded}>
            <HeaderContent>
                <Title>{title}</Title>
                <Text>{text}</Text>
            </HeaderContent>
            <ExpandContent expanded={expanded}>
                {
                    !hasItems()
                        ? 'No content'
                        : items
                }
            </ExpandContent>
        </Content>
    );
}