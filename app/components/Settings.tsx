import { Appearance, Button, ColorSchemeName, ScrollView, Text, View } from 'react-native';
import React from 'react';
import { layoutStyles } from '../styles/layout.tsx';
import { typoStyles } from '../styles/typo.tsx';
import { defaultOffset, primaryColor } from '../styles/variables.tsx';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes.tsx';
import { Container } from './Container.tsx';
import { FileImport } from './FileImport.tsx';
import { FileExport } from './FileExport.tsx';
import { Select } from './Select.tsx';
import { useAppDispatch, useAppSelector } from '../domain/hooks.ts';
import { setTheme } from '../features/settingsSlice.tsx';
import setColorScheme = Appearance.setColorScheme;

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

export function Settings({navigation, route}: Props): React.JSX.Element {
    const theme = useAppSelector(state => state.settings.theme);
    const dispatch = useAppDispatch();

    const themes: Array<{heading: string, value: ColorSchemeName}> = [
        {
            heading: 'Light',
            value: 'light',
        },
        {
            heading: 'Dark',
            value: 'dark',
        },
    ];

    const changeTheme = (t: ColorSchemeName) => {
        const scheme = t || 'light';
        dispatch(setTheme(scheme));
        setColorScheme(scheme);
    };

    return (
        <Container>
            <View style={layoutStyles.header}>
                <Text style={typoStyles.heading}>Settings</Text>
            </View>

            <ScrollView style={{margin: defaultOffset}}>
                <View style={{gap: defaultOffset}}>
                    <FileImport />
                    <FileExport />

                    <Select
                        value={theme}
                        onChange={changeTheme}
                        items={themes}
                    />
                </View>
            </ScrollView>

            <View style={layoutStyles.footer}>
                <View style={layoutStyles.row}>
                    <Button
                        color={primaryColor}
                        title={'Meal List'}
                        onPress={() => navigation.navigate('MealList')}
                    />

                    <Button
                        color={primaryColor}
                        title={'Food List'}
                        onPress={() => navigation.navigate('FoodList', {})}
                    />
                </View>

                <View style={layoutStyles.spacer} />

                <View style={layoutStyles.row}>
                    <Button
                        color={primaryColor}
                        title={'Stats'}
                        onPress={() => navigation.navigate('Stats')}
                    />
                </View>
            </View>
        </Container>
    );
}
