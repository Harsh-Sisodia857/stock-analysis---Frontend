import React, { useState } from 'react';

const DeleteConfirmationAlert = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  itemName 
}) => { 
    console.log("Item name : ", itemName)
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-red-600">Confirm Deletion</h3>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-700">
            Are you sure you want to delete this {itemName}? This action cannot be undone.
          </p>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm(itemName);
              onClose();
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationAlert;