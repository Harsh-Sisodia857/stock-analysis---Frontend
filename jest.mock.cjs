// jest.mock.js
global.import = { 
    meta: { 
      env: {
        VITE_API_URL: 'http://localhost:3000', 
      } 
    }
  };