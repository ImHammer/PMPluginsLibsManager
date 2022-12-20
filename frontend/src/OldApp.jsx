
import React, {useEffect, useState} from 'react';
import ResumeItemComponent from './components/ResumeContent';
import { EventsEmit, EventsOn, LogPrint } from '../wailsjs/runtime/runtime';

import {
    ActionsContainer,
    LibsContainer,
    MainContainer,
    CenterContainer,
    ResumeContainer,
    ResumeContainerList,
    SourcesContainer,
    NotPluginContainer,
    SectionContentTitle,
    SectionContentContent
} from './Styles';

import DirectoryTree from './components/DirectoryTree';
import Notifications from './components/Notifications';

const NotPlugin = () => {
    return (
        <NotPluginContainer>
            <div className='not-plugin'>Nenhum plugin foi selecionado</div>
            <div className='not-plugin-sub'>Clique para abrir um plugin</div>
        </NotPluginContainer>
    )
}

export default function App() {

    const [plugin, setPlugin] = useState({});
    const [sources, setSources] = useState(undefined);
    const [notifications, setNotifications] = useState([]);

    function isValidPlugin() {
        return (plugin.name !== undefined);
    }

    function handleSelectPlugin() {
        if (!isValidPlugin()) {
            EventsEmit("handle_select_plugin");
        }
    }

    useEffect(() => {
        EventsOn("plugin_data", (pluginInfo, sourcesList) => {
            pluginInfo = JSON.parse(pluginInfo)
            if (pluginInfo !== undefined) {
                setPlugin(pluginInfo)
            }

            setSources(() => (JSON.parse(sourcesList)));
        });

        EventsOn("notification", (title, message, type) => {
            setNotifications(() => [
                ...notifications,
                {
                    title,
                    message,
                    type
                }
            ]);
        });

        // setNotifications(() => [
        //     ...notifications,
        //     {
        //         title: "Testando",
        //         message: "Testando as notificações",
        //         type: 'success'
        //     },
        //     {
        //         title: "Testando",
        //         message: "Testando as notificações",
        //         type: 'danger'
        //     },
        //     {
        //         title: "Testando",
        //         message: "Testando as notificações",
        //         type: 'warning'
        //     }
        // ]);
    }, []);

    function hasNotifications() {
        return (notifications !== undefined && notifications.length && notifications.length > 0);
    }

    const PluginSourceList = () => {
        return (
            <DirectoryTree basename={sources.basename} directories={sources.directories} files={sources.files} />
        );
    }

    const PluginLibsList = () => {
        
    };

    const Actions = () => {

    };

    let pluginName = plugin.name ?? "------";
    let pluginVersion = plugin.version ?? "------";
    let pluginApi = plugin.api ?? "------";
    let pluginDescription = plugin.description ?? "------";
    
    let pluginCommandsValue = plugin.commands ?? {};
    let pluginPermissionsValue = plugin.permissions ?? {};
    let pluginAuthorsValue = plugin.author || plugin.authors || [];

    let pluginCommandsCount = Object.keys(pluginCommandsValue).length;
    let pluginPermissionsCount = Object.keys(pluginPermissionsValue).length;
    let pluginAuthorsCount = typeof pluginAuthorsValue === "string" ? pluginAuthorsValue : pluginAuthorsValue.length;

    let pluginAuthors = typeof pluginAuthorsValue === "string" ? [] : pluginAuthorsValue;
    let pluginCommands = Object.keys(pluginCommandsValue);
    let pluginPermissions = Object.keys(pluginPermissionsValue);

    return (
        <MainContainer>
            {
                hasNotifications()
                ? <Notifications notifications={notifications} setnotify={setNotifications} />
                : ""
            }
            <ResumeContainer pluginselected={isValidPlugin()} onClick={handleSelectPlugin}>
                <SectionContentTitle>Informações do Plugin</SectionContentTitle>
                <SectionContentContent>
                    <ResumeContainerList>
                        <ResumeItemComponent title="NOME" text={pluginName}/>
                        <ResumeItemComponent title="VERSÃO" text={pluginVersion}/>
                        <ResumeItemComponent title="API" text={pluginApi}/>
                        <ResumeItemComponent title="DESCRIÇÃO" text={pluginDescription}/>
                        <ResumeItemComponent title="AUTHOR'S" text={pluginAuthorsCount} items={pluginAuthors}/>
                        <ResumeItemComponent title="COMANDOS" text={pluginCommandsCount} items={pluginCommands}/>
                        <ResumeItemComponent title="PERMISSÕES" text={pluginPermissionsCount} items={pluginPermissions}/>
                    </ResumeContainerList>
                </SectionContentContent>
            </ResumeContainer>
            <CenterContainer>
                <SourcesContainer pluginselected={isValidPlugin()} onClick={handleSelectPlugin}>
                    <SectionContentTitle>Arquivos</SectionContentTitle>
                    <SectionContentContent>
                        { isValidPlugin() ? PluginSourceList() : <NotPlugin /> }
                    </SectionContentContent>
                </SourcesContainer>
                <LibsContainer pluginselected={isValidPlugin()} onClick={handleSelectPlugin}>
                    <SectionContentTitle>Livrarias</SectionContentTitle>
                    <SectionContentContent>
                        { isValidPlugin() ? PluginLibsList() : <NotPlugin /> }
                    </SectionContentContent>
                </LibsContainer>
            </CenterContainer>
            <ActionsContainer pluginselected={isValidPlugin()} onClick={handleSelectPlugin}>
                { isValidPlugin() ? Actions() : <NotPlugin /> }
            </ActionsContainer>
        </MainContainer>
    );
}