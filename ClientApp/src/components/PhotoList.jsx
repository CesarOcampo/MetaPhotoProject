
import React, { useState, useEffect } from 'react';
import PhotoItem from './PhotoItem';
import Filters from './Filters';
import Pagination from './Pagination';

const PhotoList = () => {
    const [photos, setPhotos] = useState([]);
    const [filters, setFilters] = useState({ title: '', albumTitle: '', userEmail: '' });
    const [limit, setLimit] = useState(25);
    const [offset, setOffset] = useState(0);
    const [totalPhotos, setTotalPhotos] = useState(0);

    useEffect(() => {
        fetchPhotos();
    }, [filters, limit, offset]);

    const fetchPhotos = async () => {
        const query = new URLSearchParams({
            ...filters,
            limit,
            offset
        }).toString();
        const response = await fetch(`/externalapi/photos?${query}`);
        const data = await response.json();
        setPhotos(data);
        setTotalPhotos(data.length); 
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleLimitChange = (newLimit) => {
        setLimit(newLimit);
    };

    const handlePageChange = (newOffset) => {
        setOffset(newOffset);
    };

    return (
        <div>
            <Filters onFilterChange={handleFilterChange} />
            <div>
                {photos.map(photo => <PhotoItem key={photo.id} photo={photo} />)}
            </div>
            <Pagination
                totalItems={totalPhotos}
                limit={limit}
                offset={offset}
                onLimitChange={handleLimitChange}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default PhotoList;
