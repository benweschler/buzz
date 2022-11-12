import React, { useEffect } from 'react';

function Explore() {
    useEffect(() => {
        document.title = "What's Buzzing?";
    });
    return (
        <div>
            <h1>What's Buzzing?</h1>
            <h2>recommended event...</h2>
            <h2>recommended event...</h2>
            <h2>recommended event...</h2>
            <h2>recommended event...</h2>
        </div>
    );
};

export default Explore;