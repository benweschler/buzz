import React, { useEffect } from 'react';

function Feed() {
    useEffect(() => {
        document.title = 'My Favorites';
    });
    return (
        <h2>Lists of followed organizers and their events...</h2>
    );
};

export default Feed;