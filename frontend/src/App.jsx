
import { useEffect } from 'react';
import { useReducer } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { EventsOn, LogPrint } from '../wailsjs/runtime/runtime';

import Home from './pages/Home';
import Plugins from './pages/Plugins';
import PluginContext from './services/PluginContext';

function pluginReducer(state, action) {
    switch(action.type) {
        case 'set':
            return action.payload;
        case 'add_lib':
            const lastLibs = state.libs;
            
            let founded = false;
            lastLibs.map(value => {
                if (value.name === action.payload.name) {
                    founded = true;
                }
            });
            if (!founded) {
                lastLibs.push({
                    name: action.payload.name,
                    version: action.payload.version,
                    namespace: action.payload.namespace
                });
            }
            return { ...state, libs: lastLibs }
        case 'update_libs':
            return {
                ...state,
                libs: action.payload
            }
        case 'get':
        default:
            return state;
    }
}

export default function App() {
    const [pluginState, dispatchPlugin] = useReducer(pluginReducer, {});

    useEffect(() => {
        EventsOn('start_project', (pluginInfo, libs) => {
            dispatchPlugin({
                type: 'set',
                payload: { ...JSON.parse(pluginInfo), libs: JSON.parse(libs) }
            });
        });
        EventsOn('stf_update_libs', libsStr => {
            const libs = JSON.parse(libsStr);
            dispatchPlugin({
                type: 'update_libs',
                payload: Object.values(libs)
            })
        });
    }, []);

    return (
        <PluginContext.Provider value={{ state: pluginState, dispatch: dispatchPlugin }}>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Home/>} exact />
                    <Route path="/plugin" element={<Plugins/>}/>
                </Routes>
            </HashRouter>
        </PluginContext.Provider>
    );
}