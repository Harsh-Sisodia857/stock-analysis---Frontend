// jest.setup.cjs
require("@testing-library/jest-dom");
global.import = {};
global.import.meta = { env: { VITE_API_URL: "http://localhost:3000" } };

