import React from 'react';

// TODO: Write types for props
export const Svg = ({ icon, children, ...rest }: any) => {
    const commonConfig = {
        xmlns: "http://www.w3.org/2000/svg",
        ...icon ? {
            width:"40",
            height:"40",
            viewBox:"0 0 50 50"
        } : {}
    };

    return (
        <svg  {...commonConfig} {...rest}>
            {children}
        </svg>
    );
};
