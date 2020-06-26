import React from 'react';
import Loadable from 'react-loadable';

const Loading = props => {
    if (props.pastDelay) {
        return (
            <p>Loding</p>
        )
    }
    return null;
}

export default loader => {
    return Loadable({
        loader,
        loading: Loading,
        delay: 1000
    });
}