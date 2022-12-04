
import { useContext, useEffect } from 'react';
import { PluginInfoContext } from '../../services/PluginInfo';
import {
    Container, ListContent, ListItemContent, ListItemKey, ListItemValue
} from './style';

const PluginInfoContainer = () => {

    const pluginInfo = useContext(PluginInfoContext);

    return (
        <Container>
            <ListContent>
                <ListItemContent>
                    <ListItemKey>Nome:</ListItemKey>
                    <ListItemValue>{pluginInfo.name ?? '---'}</ListItemValue>
                </ListItemContent>
                <ListItemContent>
                    <ListItemKey>Versão:</ListItemKey>
                    <ListItemValue>{pluginInfo.version ?? '---'}</ListItemValue>
                </ListItemContent>
                <ListItemContent>
                    <ListItemKey>API:</ListItemKey>
                    <ListItemValue>{pluginInfo.api ?? '---'}</ListItemValue>
                </ListItemContent>
            </ListContent>
        </Container>
    );
}
export default PluginInfoContainer