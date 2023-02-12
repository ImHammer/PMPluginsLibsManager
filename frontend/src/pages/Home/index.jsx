
import { 
    Container,
    Title,
    OpenPluginContainer,    
    ExternalLinksContainer,
    ExternalLinkContent,
    LoadingContainer,
    LoadingContent
} from "./styles";

import { FaLinkedinIn, FaGithubAlt } from 'react-icons/fa';
import { EventsEmit, EventsOn, LogPrint } from '../../../wailsjs/runtime/';
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PluginContext from "../../services/PluginContext";

export default function Home() {
    
    const pluginCtx = useContext(PluginContext)
    const [loading, setLoadingState] = useState(false);
    const navigate = useNavigate();

    function openPlugin() {
        EventsEmit('handle_select_plugin');
    }

    useEffect(() => {
        EventsOn('loading_plugin', value => {
            setLoadingState(() => value);
        });
    }, []);

    function isValidPlugin() {
        return pluginCtx.state !== undefined && pluginCtx.state.name !== undefined;
    }

    useEffect(() => {
        if (isValidPlugin()) navigate('/plugin'); 
    });


    return (
        <Container>
            {
                loading === true
                ? <LoadingContainer>
                    <LoadingContent>CARREGANDO<br/>PLUGIN...</LoadingContent>
                </LoadingContainer>
                : ""
            }

            <Title>PMPluginsManager</Title>
            <OpenPluginContainer onClick={openPlugin}>
                ABRIR PLUGIN
            </OpenPluginContainer>
            <ExternalLinksContainer>
                <ExternalLinkContent href="https://www.linkedin.com/in/danilo-jesus-652a12216/">
                    <FaLinkedinIn />
                </ExternalLinkContent>
                <ExternalLinkContent href="https://github.com/ImHammer">
                    <FaGithubAlt />
                </ExternalLinkContent>
            </ExternalLinksContainer>
        </Container>
    );
}