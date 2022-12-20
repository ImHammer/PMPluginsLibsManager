
import { 
    Container,
    Header,
    Title,
    Description,
    Separator,
    Main,
    ActionsContent,
    ActionsContentTitle,
    ActionsContentButtons,
    ActionsContentButton
 } from "./styles";

export default function Home() {
    return (
    <Container>
        <Header>
            <Title>PMLibsManager</Title>
            <Description>Manuseamento de plugins para o pocketmine</Description>
        </Header>
        <Separator />
        <Main>
            <ActionsContent>
                <ActionsContentTitle>Escolha um caminho abaixo</ActionsContentTitle>
                <ActionsContentButtons>
                    <ActionsContentButton href="/plguins" title="Abra um plugin para adicionar livrarias">Plugins</ActionsContentButton>
                    <ActionsContentButton href="/libs" title="Crie uma lib para adicionar a um plugin">Livrarias</ActionsContentButton>
                </ActionsContentButtons>
            </ActionsContent>
        </Main>
    </Container>
    );
}