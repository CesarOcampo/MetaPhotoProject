import React, { useState, useEffect } from 'react';
import PhotoList from './components/PhotoList';
import Filters from './components/Filters';
import Pagination from './components/Pagination';
import './App.css';

function App() {
    const [photos, setPhotos] = useState([]);
    const [title, setTitle] = useState('');
    const [albumTitle, setAlbumTitle] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [limit, setLimit] = useState(25);
    const [offset, setOffset] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetchPhotos();
    }, [title, albumTitle, userEmail, limit, offset]);

    const fetchPhotos = async () => {
        const response = await fetch(
            `/externalapi/photos?title=${title}&album.title=${albumTitle}&userEmail=${userEmail}&limit=${limit}&offset=${offset}`
        );
        const data = await response.json();
        setPhotos(data);
        setTotal(parseInt(response.headers.get('X-Total-Count'), 10));
    };

    return (
        <div className="App">
            <Filters
                title={title}
                albumTitle={albumTitle}
                userEmail={userEmail}
                setTitle={setTitle}
                setAlbumTitle={setAlbumTitle}
                setUserEmail={setUserEmail}
            />
            <PhotoList photos={photos} />
            <Pagination
                total={total}
                limit={limit}
                offset={offset}
                setLimit={setLimit}
                setOffset={setOffset}
            />
        </div>
    );
}

export default App;
