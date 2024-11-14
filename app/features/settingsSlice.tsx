import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColorSchemeName } from 'react-native';

export interface SettingsState {
    theme: ColorSchemeName;
}

const initialState: SettingsState = {
    theme: 'light',
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setTheme: (state: SettingsState, action: PayloadAction<ColorSchemeName>) => {
            state.theme = action.payload;
        },
    },
});

export const {
    setTheme,
} = settingsSlice.actions;

export default settingsSlice.reducer;
