
import { useState, useRef } from 'react';
import {
    Container,
    PluginContent,
    LibsContent,
    InputGroup,
    Input,
    Button,
    PluginInfos,
    List,
    ListItem,

} from "./styles";

export default function AddLib() {

    const inputPluginPathRef = useRef("");

    return (
        <Container>
            <PluginContent>
                <InputGroup>
                    <Input ref={inputPluginPathRef} name="path" placeholder="Caminho até a pasta do plugin" />
                    <Button>Selecionar</Button>
                    <PluginInfos>
                        <List>
                            <ListItem>
                                <div>Nome</div>
                                <div>Nome do plugin</div>
                            </ListItem>
                        </List>
                    </PluginInfos>
                </InputGroup>
            </PluginContent>
            <LibsContent>
                <Title>Livrarias</Title>
                <Button>Adicionar livraria</Button>
                <SelctionList>
                    <option></option>
                </SelctionList>
                <Button>Remover livraria</Button>
            </LibsContent>
        </Container>
    );
}