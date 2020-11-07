import React, { memo } from 'react';

export const createSvgIcon = (path, name) => {
    const Component = memo(props => <SvgIcon {...props}>{path}</SvgIcon>);

    Component.displayName = `${name}Icon`;

    return Component;
};

const SvgIcon = props => {
    const {
        width,
        children,
        className,
        color = 'inherit',
        component: Component = 'svg',
        title = '',
        viewBox = '0 0 32 32',
        ...other
    } = props;

    return (
        <Component
            style={{
                userSelect: 'none',
                width: '1em',
                height: '1em',
                display: 'inline-block',
                fill: 'currentColor',
                flexShrink: 0,
                fontSize: 24,
            }}
            viewBox={viewBox}
            focusable="false"
            {...other}
        >
            {children}
        </Component>
    );
};
