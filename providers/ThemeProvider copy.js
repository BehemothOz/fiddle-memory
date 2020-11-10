import React, { useCallback, useContext, useState } from 'react';
import { createTheme, createPalette } from '../styles/theme';

const ThemeContext = React.createContext(null);
// const ThemeActionContext = React.createContext();

const mergeOuterLocalTheme = (outerTheme, localTheme) => {
    const { type } = localTheme;

    if (outerTheme.type !== type) {
        return {
            ...outerTheme,
            ...localTheme,
            palette: createPalette(localTheme.type),
        };
    }

    return {
        ...outerTheme,
        ...localTheme,
    };
};

export const ThemeProvider = props => {
    const { children, theme: localTheme } = props;
    const outerTheme = useTheme();

    console.log('outerTheme', outerTheme);

    const theme = outerTheme === null ? localTheme : mergeOuterLocalTheme(outerTheme, localTheme);

    return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    return useContext(ThemeContext);
};

export const useToggleTheme = () => {
    // return useContext(ThemeContext);
};
