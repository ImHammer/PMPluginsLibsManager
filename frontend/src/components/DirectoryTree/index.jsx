
import File from './File';
import Directory from './Directory';
import { LogPrint } from '../../../wailsjs/runtime/runtime';
import {
    Container
} from './styles';

function createDirectory({ basename, directories, files }) {
    
    const directoriesElement = [];
    const filesElement = [];

    if (directories !== undefined) {
        const dirNames = Object.keys(directories);
        for (let dirName of dirNames) {
            const { directories: _direcories, files: _files } = directories[dirName];
            directoriesElement.push(createDirectory({
                basename: dirName,
                directories: _direcories,
                files: _files
            }));
        }
    }
    if (files !== undefined && files.length && files.length > 0)
        for (let fileName of files)
            filesElement.push(<File basename={fileName}/>);

    return (
        <Directory basename={basename}>
            { directoriesElement }
            { filesElement }
        </Directory>
    );
}

export default function DirectoryTree({ basename, directories, files }) {

    const rootDirecory = createDirectory({
        basename,
        directories,
        files
    });

    return (
        <Container>
            { rootDirecory }
        </Container>
    );
}
