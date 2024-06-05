
import React from 'react';

const Pagination = ({ totalItems, limit, offset, onLimitChange, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / limit);

    const handleLimitChange = (event) => {
        onLimitChange(parseInt(event.target.value, 10));
    };

    const handlePageChange = (newOffset) => {
        onPageChange(newOffset);
    };

    return (
        <div>
            <select value={limit} onChange={handleLimitChange}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
            </select>
            <div>
                {[...Array(totalPages).keys()].map(page => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page * limit)}
                        disabled={offset === page * limit}
                    >
                        {page + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Pagination;
