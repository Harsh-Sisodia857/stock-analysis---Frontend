import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  
  // Logic to determine which page numbers to show
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  // Adjust start page if we're near the end
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  // Generate the page numbers to display
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  
  return (
    <div className="flex justify-center items-center mt-8 mb-4">
      <nav className="inline-flex rounded-md shadow-sm" aria-label="Pagination">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`relative inline-flex items-center px-4 py-2 rounded-l-md border ${
            currentPage === 1 
              ? 'bg-gray-100 text-gray-400 cursor-default' 
              : 'bg-white text-gray-500 hover:bg-gray-50'
          } border-gray-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10`}
        >
          Previous
        </button>
        
        {/* First page (if not in view) */}
        {startPage > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10"
            >
              1
            </button>
            {startPage > 2 && (
              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                ...
              </span>
            )}
          </>
        )}
        
        {/* Page numbers */}
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`relative inline-flex items-center px-4 py-2 border ${
              currentPage === number
                ? 'z-10 bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            } text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10`}
          >
            {number}
          </button>
        ))}
        
        {/* Last page (if not in view) */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                ...
              </span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10"
            >
              {totalPages}
            </button>
          </>
        )}
        
        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`relative inline-flex items-center px-4 py-2 rounded-r-md border ${
            currentPage === totalPages 
              ? 'bg-gray-100 text-gray-400 cursor-default' 
              : 'bg-white text-gray-500 hover:bg-gray-50'
          } border-gray-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10`}
        >
          Next
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
