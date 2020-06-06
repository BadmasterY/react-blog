import React from 'react';

function Loading(props: { style?: React.CSSProperties }) {
    const { style } = props;

    return (
        <div style={style} id="loading-box">
            <div id="loading" />
        </div>
    );
}

export default Loading;