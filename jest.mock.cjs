// jest.mock.js
global.import = { 
    meta: { 
      env: {
        VITE_API_URL: 'http://localhost:5000', // Or whatever mock URL you want to use
        // Add other env variables if needed
      } 
    }
  };