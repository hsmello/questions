import React from 'react';

const If = ({show, children}) => {
    return show ? (children) : (<></>)
};

export default If