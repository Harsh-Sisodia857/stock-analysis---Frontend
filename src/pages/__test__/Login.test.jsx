import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import Login from "../../pages/Login";
import '@testing-library/jest-dom';
import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock the API module using vi.mock
vi.mock("../../apiManager/stockApiManager", () => ({
  loginApi: vi.fn().mockImplementation((email, password) => {
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
vi.mock("react-toastify", () => ({
  toast: vi.fn()
}));

// Mock the image import
vi.mock("../../assets/login-bgm.jpg", () => ({
  default: "mocked-image.jpg",
}));

const mockStore = configureStore([]);

describe("Login Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({ 
      user: {},
      errors: {} 
    });
  
    vi.clearAllMocks();
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
