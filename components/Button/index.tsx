import React from 'react';

type ButtonProps = {
    onClick: () => void;
};

export const Button: React.FC<ButtonProps> = props => {
    const { children, onClick } = props;

    return (
        <>
            <button className="button" onClick={onClick}>
                {children}
            </button>
            <style jsx>
                {`
                    .button {
                        padding: 8px 16px;
                        font-size: 14px;
                        color: #1976d2;
                        background: transparent;
                        border: 1px solid #1976d2;
                        outline: none;
                        cursor: pointer;
                        text-transform: uppercase;
                    }

                    .button:hover {
                        color: #2163ff;
                        border-color: #2163ff;
                    }

                    .button:active {
                        color: #1c4bff;
                        border-color: #1c4bff;
                    }
                `}
            </style>
        </>
    );
};
