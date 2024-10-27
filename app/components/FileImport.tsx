import { Button } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { useAppDispatch } from '../domain/hooks.ts';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import { loadFile } from '../domain/file.ts';
import { importFood } from '../features/foodSlice.tsx';
import { importMeal } from '../features/mealSlice.tsx';
import { primaryColor } from '../styles/variables.tsx';

type Props = PropsWithChildren<{}>;

export function FileImport({}: Props): React.JSX.Element {
    const dispatch = useAppDispatch();

    const importFile = async () => {
        try {
            const res: DocumentPickerResponse[] = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });

            const file = res[0];
            const data = await loadFile(file.uri);

            if (data) {
                const {meal, food} = JSON.parse(data);
                dispatch(importFood({food}));
                dispatch(importMeal({meal}));
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // nothing
            } else {
                console.error(err);
            }
        }
    };

    return <Button color={primaryColor} title={'Load'} onPress={importFile} />;
}
