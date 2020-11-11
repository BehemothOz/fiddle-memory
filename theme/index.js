const light = {
    text: {
        primary: 'black', // 'rgba(0, 0, 0, 0.87)',
        secondary: 'rgba(0, 0, 0, 0.54)',
        hint: 'rgba(0, 0, 0, 0.38)',
    },
    background: '#ff8b8b',
};

const dark = {
    text: {
        primary: 'white', // 'rgba(0, 0, 0, 0.87)',
        secondary: 'rgba(0, 0, 0, 0.54)',
        hint: 'rgba(0, 0, 0, 0.38)',
    },
    background: '#28303D',
};

export const createPalette = type => {
    const types = { light, dark };

    return {
        common: {
            black: '#000',
            white: '#fff',
        },
        ...types[type],
    };
};

export const createTheme = ({ type = 'light' }) => {
    const palette = createPalette(type);

    return {
        type,
        shadows: {
            0: 'none',
            1: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
        },
        typography: {
            htmlFontSize: 16,
            subtitle: {
                fontSize: '1rem',
                lineHeight: 1.75,
            },
        },
        palette,
    };
};
