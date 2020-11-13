const light = {
    text: {
        primary: 'rgba(0, 0, 0, 0.87)',
    },
    background: '#eaecf1',
};

const dark = {
    text: {
        primary: '#F9FAFB',
    },
    background: '#28303D',
};

/*
    PX to REM (base calc)

    const size = 14
    const baseSize = 16

    rem = size / baseSize

    pxToRem: size => `${(size / baseSize)rem`,
 */


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
        typography: {
            htmlFontSize: 16,
        },
        palette,
    };
};
