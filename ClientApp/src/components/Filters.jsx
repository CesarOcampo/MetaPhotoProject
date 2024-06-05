
import React, { useState } from 'react';

const Filters = ({ onFilterChange }) => {
    const [title, setTitle] = useState('');
    const [albumTitle, setAlbumTitle] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onFilterChange({ title, albumTitle, userEmail });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Photo Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Album Title"
                value={albumTitle}
                onChange={(e) => setAlbumTitle(e.target.value)}
            />
            <input
                type="email"
                placeholder="User Email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
            />
            <button type="submit">Apply Filters</button>
        </form>
    );
};

export default Filters;
