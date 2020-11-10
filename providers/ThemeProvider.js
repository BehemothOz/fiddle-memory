import React, { useCallback, useContext, useState } from 'react';

import { createTheme } from '../pages/_app'

const ThemeContext = React.createContext({});
const ThemeActionContext = React.createContext();


// const theme = {
//     light: {
//         color: 'green',
//     },
//     dark: {
//         color: 'orange',
//     },
// };

// const selectTheme = value => theme[value];

export const ThemeProvider = props => {
    const outerTheme = useTheme();
    console.log('outerTheme', outerTheme);
    let th;

    if (outerTheme && outerTheme.type !== props.value.type) {
        th = {
            ...createTheme(props.value.type),
            ...props.value
        }
    } else {
        th = {
            ...outerTheme,
            ...props.value,
        }
    }

    // use local storage for init value : useLocalStorage
    // const [theme, setTheme] = useState('light');

    // const toggleTheme = useCallback(
    //     value => {
    //         setTheme(value ? 'light' : 'dark');
    //     },
    //     [setTheme]
    // );

    return <ThemeContext.Provider value={th}>{props.children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    return useContext(ThemeContext);
};

export const useToggleTheme = () => {
    // return useContext(ThemeContext);
};
