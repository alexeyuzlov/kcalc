import RNFS from 'react-native-fs';

export const loadFile = async (uri: string) => {
    try {
        return await RNFS.readFile(uri, 'utf8');
    } catch (err) {
        console.error(err);
    }
}