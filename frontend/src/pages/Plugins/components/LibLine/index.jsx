
import {
    Container,
    TitleName,
    TitleVersion,
    TitleNamespace
} from './styles';

export default function LibLine(props) {
    const {name, version, namespace} = props;
    return (
        <Container {...props}>
            <TitleName>{name}</TitleName>
            <TitleVersion>{version}</TitleVersion>
            <TitleNamespace>{namespace}</TitleNamespace>
        </Container>
    )
}