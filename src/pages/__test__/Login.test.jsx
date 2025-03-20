import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import Login from "../../pages/Login";
import '@testing-library/jest-dom'; 

// Mock the API module using the correct import path
jest.mock("../../apiManager/stockApiManager", () => ({
  loginApi: jest.fn().mockImplementation((email, password) => {
    return Promise.resolve({
      json: () => Promise.resolve({
        success: true,
        authToken: "fake-token",
        userData: {
          id: "1",
          name: "Test User",
          email: email
        }
      })
    });
  })
}));

// Mock the toast module
jest.mock("react-toastify", () => ({
  toast: jest.fn()
}));

// Mock the image import
jest.mock("../../assets/login-bgm.jpg", () => "login-bg-mock");

const mockStore = configureStore([]);

describe("Login Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({ 
      user: {},
      errors: { errors: [] }
    }); 
    
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it("renders Login page", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole("heading", { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });

  it("allows the user to type in email and password fields", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    // Fill in the email and password fields
    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "harsh@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "12345" },
    });

    // Assert that the input values are correct
    expect(screen.getByLabelText("Email address").value).toBe("harsh@gmail.com");
    expect(screen.getByLabelText("Password").value).toBe("12345");
  });
});