import { Button } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { useAppSelector } from '../domain/hooks.ts';
import { food, meal } from '../features/store.ts';
import Share from 'react-native-share';
import { printDate } from '../domain/date.ts';
import { PATH_TO_INTERNAL_FILE, saveInternalFile } from '../domain/file.ts';
import { primaryColor } from '../styles/variables.tsx';

type Props = PropsWithChildren<{}>;

export function FileExport({}: Props): React.JSX.Element {
    const mealState = useAppSelector(meal);
    const foodState = useAppSelector(food);

    const exportFile = async () => {
        await saveInternalFile({
            path: PATH_TO_INTERNAL_FILE,
            content: JSON.stringify({meal: mealState, food: foodState}),
        });

        const options = {
            url: `file://${PATH_TO_INTERNAL_FILE}`,
            type: 'text/plain',
            message: `Kcalc Data ${printDate(new Date())}`,
        };

        try {
            await Share.open(options); // Открываем окно для шаринга
        } catch (error) {
            console.error('Share Error', error);
        }
    };

    return <Button color={primaryColor} title={'Save'} onPress={exportFile} />;
}
