import {useEffect, useState} from 'react';

import {
    MainContainer
} from './Styles';

import PluginInfoContainer from './components/PluginInfoContainer';
import PluginSourceListContainer from './components/PluginSourceListContainer';
import PluginLibsListContainer from './components/PluginLibsListContainer';
import ActionsContainer from './components/ActionsContainer';
import { PluginInfoContext } from './services/PluginInfo';

export default function App() {

    const [pluginInfo, setPluginInfo] = useState({});

    useEffect(() => {
        setTimeout(() => setPluginInfo({
            name: "Pocketmine",
            version: "1.0.0",
            api: "3.0.0"
        }), 3000);
    }, []);

    return (
        <PluginInfoContext.Provider value={pluginInfo}>
            <MainContainer>
                <PluginInfoContainer/>
                <PluginSourceListContainer/>
                <PluginLibsListContainer/>
                <ActionsContainer/>
            </MainContainer>
        </PluginInfoContext.Provider>
    )
}