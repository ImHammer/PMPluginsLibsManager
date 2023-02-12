
import { useEffect, useState } from 'react';
import { createRef } from 'react';
import { LogPrint } from '../../../../../wailsjs/runtime/runtime';
import {
    Container,
    Title,
    Input
} from './styles';

export default function InputGroup(props) {
    const ref = createRef();
    const [lastValue, setLastValue] = useState(props.changedValue);

    useEffect(() => {
        if (lastValue !== props.changedValue) {
            setLastValue(props.changedValue);
            if (ref.current !== undefined) ref.current.value = props.changedValue;
        }
    });

    return (
        <Container>
            <Title>{props.title}</Title>
            <Input ref={ref} {...props} onBlur={() => props.onUnfocus(ref)} />
        </Container>
    );  
}