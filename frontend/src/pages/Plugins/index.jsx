
import { useEffect } from 'react';
import { createRef } from 'react';
import { useRef } from 'react';
import { useContext, useState } from 'react';
import { useNavigation } from 'react-router';
import { EventsEmit, EventsOn, LogPrint } from '../../../wailsjs/runtime/runtime';
import PluginContext from '../../services/PluginContext';
// import InputGroup from './components/InputGroup';
import LibLine from './components/LibLine';
import {
    Container,
    SobTitle,
    Title,
    SubTitle,
    MainContainer,
    LibsContainer,
    LibsTable,
    LibsTableHead,
    LibsTableBody,
    // LibsTableItem,
    ActionsContainer,
    ButtonsList,
    ActionButton,

    AddLibraryTitle,
    AddLibraryBackdrop,
    AddLibraryContainer,

    TinyTitle,
    Form,
    DoubleInputContent,
    BrowserButton,
    AddButton,

    InputGroupContainer,
    LibraryInputTitle,
    LibraryInput
} from './styles';

export default function Plugins() {
    const pluginCtx = useContext(PluginContext)
    const plugin = pluginCtx.state;

    const [selectedLibs, setSelectedLibs] = useState([]);
    const [forRemove, setForRemoveLibs] = useState([]);
    const [hasChanges, changed] = useState(false);
    const [showAddLibrary, setShowAddLibrary] = useState(false);

    const inputNameRef = useRef();
    const inputVersionRef = useRef();
    const inputNamespaceRef = useRef();
    const inputDirectoryRef = useRef();

    const [addLibConfig, setAddLibConfig] = useState({
        name: '',
        version: '',
        namespace: '',
        directory: '',
        isPlugin: false,
        hasChanges: false
    });

    function canAddLib() {
        return addLibConfig.name !== ''
               && addLibConfig.version !== ''
               && addLibConfig.directory !== ''
    }

    function onClickedInLib(libName) {
        if (isSelectedLib(libName))  {
            setSelectedLibs(() => selectedLibs.filter(_libName => {
                return _libName !== libName;
            } ));
        } else {
            setSelectedLibs(() => [
                ...selectedLibs,
                libName
            ]);
        }
    }

    useEffect(() => {
        EventsOn('response_back_lib_directory', newLibForAddStr => {
            const newLibForAdd = JSON.parse(newLibForAddStr);
            setAddLibConfig(() => (newLibForAdd));

            inputNameRef.current.value = newLibForAdd.name;
            inputVersionRef.current.value = newLibForAdd.version;
            // inputNamespaceRef.current.value = newLibForAdd.namespace;
            inputDirectoryRef.current.value = newLibForAdd.directory;
        });
    }, []);

    function handleSelectLibDirector() {
        EventsEmit('request_back_lib_directory');
    }

    function unfocusAddLibInput(keyLibName, inputRef) {
        if (addLibConfig[keyLibName] !== inputRef.current.value) {
            setAddLibConfig(() => ({
                ...addLibConfig,
                [keyLibName]: inputRef.current.value,
                hasChanges: true
            }));
        }
    }

    function handleCompleteAddLib() {
        if (canAddLib()) {
            setShowAddLibrary(false);

            pluginCtx.dispatch({
                type: 'add_lib',
                payload: {
                    ...addLibConfig
                }
            });

            EventsEmit('request_back_complete_add_library', JSON.stringify(addLibConfig));
            setAddLibConfig(() => ({
                name: '',
                version: '',
                namespace: '',
                directory: '',
                hasChanges: false
            }));

            inputNameRef.current.value      = '';
            inputVersionRef.current.value   = '';
            // inputNamespaceRef.current.value = '';
            inputDirectoryRef.current.value = '';

            changed(() => (true));
        }
    }

    function isRemoveLib(libName) {
        return forRemove.indexOf(libName) != -1
    }

    function isSelectedLib(libName) {
        if (isRemoveLib(libName)) return false;
        return selectedLibs.indexOf(libName) !== -1;
    }

    function removeSelectedLibs() {
        EventsEmit("request_back_update_remove_libs",  ...selectedLibs);
        
        setForRemoveLibs(() => (selectedLibs));

        changed(() => (true));
    }

    function save() {
        EventsEmit('request_back_save_project');
    }

    return (
        <Container>
            <AddLibraryBackdrop show={showAddLibrary}>
                <AddLibraryContainer>
                    <AddLibraryTitle>ADICIONANDO LIVRARIA</AddLibraryTitle>
                    <TinyTitle>Selcionando plugin, os campos serão autocompletados</TinyTitle>
                    <Form>
                        <InputGroupContainer>
                            <LibraryInputTitle>Nome</LibraryInputTitle>
                            <LibraryInput ref={inputNameRef} onBlur={() => unfocusAddLibInput('name', inputNameRef)} name="name" type="text" />
                        </InputGroupContainer>
                        <InputGroupContainer>
                            <LibraryInputTitle>Versão</LibraryInputTitle>
                            <LibraryInput ref={inputVersionRef} onBlur={() => unfocusAddLibInput('version', inputVersionRef)} name="version" type="text" />
                        </InputGroupContainer>
                        <DoubleInputContent>
                            <InputGroupContainer>
                                <LibraryInputTitle>Diretorio</LibraryInputTitle>
                                <LibraryInput ref={inputDirectoryRef} onBlur={() => unfocusAddLibInput('directory', inputDirectoryRef)} name="directory" type="text" />
                            </InputGroupContainer>
                            <BrowserButton onClick={handleSelectLibDirector}>Selecionar</BrowserButton>
                        </DoubleInputContent>
                        <DoubleInputContent>
                            <AddButton unlocked={canAddLib()} onClick={() => handleCompleteAddLib()}>Adicionar</AddButton>
                            <AddButton unlocked onClick={() => setShowAddLibrary(false)}>Cancelar</AddButton>
                        </DoubleInputContent>
                    </Form>
                </AddLibraryContainer>
            </AddLibraryBackdrop>

            <SobTitle>{plugin.directory}</SobTitle>
            <Title>{plugin.name}</Title>
            <SubTitle>{plugin.version} - API {plugin.api} </SubTitle>
            <MainContainer>
                <LibsContainer>
                    <LibsTable>
                        <LibsTableHead>
                            <h3><span></span>Nome</h3>
                            <h3><span></span>Versão</h3>
                            <h3><span></span>Namespace</h3>
                        </LibsTableHead>
                        <LibsTableBody>
                            {
                                plugin.libs.map(lib => {
                                    return <LibLine
                                        key={lib.name}
                                        isSelected={isSelectedLib(lib.name)}
                                        forRemove={isRemoveLib(lib.name)}
                                        onClick={() => onClickedInLib(lib.name)}
                                        name={lib.name}
                                        version={lib.version}
                                        namespace={lib.namespace} />
                                })
                            }
                        </LibsTableBody>
                    </LibsTable>
                </LibsContainer>
                <ActionsContainer>
                    <ButtonsList>
                        <ActionButton onClick={() => setShowAddLibrary(true)}>ADICIONAR</ActionButton>
                        <ActionButton onClick={() => removeSelectedLibs()} unlocked={(selectedLibs.length > 0)} title="Marcar para remover as livrarias">REMOVER</ActionButton>
                        <ActionButton onClick={() => save()} unlocked={(hasChanges === true)}>SALVAR</ActionButton>
                    </ButtonsList>
                </ActionsContainer>
            </MainContainer>
        </Container>
    )
}