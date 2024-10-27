import RNFS from 'react-native-fs';

export const FILE_DATA_NAME = 'kcal-data.json';
export const REPORT_FILE_NAME = 'kcal-report.html';
export const PATH_TO_INTERNAL_FILE = `${RNFS.DocumentDirectoryPath}/${FILE_DATA_NAME}`;
export const PATH_TO_REPORT_FILE_NAME = `${RNFS.DocumentDirectoryPath}/${REPORT_FILE_NAME}`;

export const loadFile = async (uri: string) => {
    try {
        return await RNFS.readFile(uri, 'utf8');
    } catch (err) {
        console.error(err);
    }
};

export const saveInternalFile = async ({path, content}: { path: string, content: string }) => {
    try {
        await RNFS.writeFile(
            path,
            content,
            'utf8'
        );
    } catch (err: any) {
        console.error(err.message);
    }
};

const readInternalFile = async () => {
    try {
        const dir = await RNFS.readDir(RNFS.DocumentDirectoryPath);
        const [statResult, filePath] = await Promise.all([RNFS.stat(dir[0].path), dir[0].path]);

        if (statResult.isFile()) {
            return loadFile(filePath);
        }

        throw new Error('Not a file');
    } catch (err: any) {
        console.error(err.message, err.code);
    }
};