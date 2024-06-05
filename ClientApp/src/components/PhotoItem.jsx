
import React from 'react';

const PhotoItem = ({ photo }) => {
    return (
        <div>
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <h3>{photo.title}</h3>
            <p>Album: {photo.album.title}</p>
            <p>User: {photo.album.user.name} ({photo.album.user.email})</p>
        </div>
    );
};

export default PhotoItem;
