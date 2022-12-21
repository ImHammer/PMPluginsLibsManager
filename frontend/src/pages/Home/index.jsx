
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
import { EventsEmit } from '../../wailsjs/runtime/runtime.js';

export default function Home() {

    function exitFromApp() {
        EventsEmit("app_exit")
    }

    return (
    <Container>
        <Header>
            <Title>PMLibsManager</Title>
            <Description>Manuseamento de plugins para o pocketmine</Description>
        </Header>
        <Separator />
        <Main>
            <ActionsContent>
                <ActionsContentTitle>Escolha uma ação abaixo</ActionsContentTitle>
                <ActionsContentButtons>
                    <Subtitle>Plugins</Subtitle>
                    <ActionsContentButton href="/plugins/create">Criar plugin</ActionsContentButton>
                    <ActionsContentButton href="/plugins/edit">Editar plugin</ActionsContentButton>
                    <ActionsContentButton href="/plugins/addlib">Adicionar livrarias</ActionsContentButton>
                    <Subtitle>Libs</Subtitle>
                    <ActionsContentButton href="/libs/create">Criar livraria</ActionsContentButton>
                    <ActionsContentButton href="/libs/edit">Editar livraria</ActionsContentButton>
                    <Separator></Separator>
                    <ActionsContentButton onClick={exitFromApp}>Sair</ActionsContentButton>
                    {/* <ActionsContentButton href="/plguins" title="Abra um plugin para adicionar livrarias">Plugins</ActionsContentButton> */}
                    {/* <ActionsContentButton href="/libs" title="Crie uma lib para adicionar a um plugin">Livrarias</ActionsContentButton> */}
                </ActionsContentButtons>
            </ActionsContent>
        </Main>
    </Container>
    );
}