import React, { useContext } from 'react';

export const ThemeContext = React.createContext(null);

const mergeOuterLocalTheme = (outerTheme, localTheme) => {
    return { ...outerTheme, ...localTheme };
};

export const ThemeProvider = props => {
    const { children, theme: localTheme } = props;
    const outerTheme = useTheme();

    const theme = outerTheme === null ? localTheme : mergeOuterLocalTheme(outerTheme, localTheme);

    return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    return useContext(ThemeContext);
};
