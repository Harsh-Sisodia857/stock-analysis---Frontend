import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import Login from "../../pages/Login";
import "@testing-library/jest-dom"; 

const mockStore = configureStore([]);

describe("Login Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({ user: {} });
    store.clearActions(); // ✅ Prevents stale actions from affecting tests
  });

  test("renders Login page", () => {
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

  test("allows the user to type in email and password fields", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "harsh@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "12345" },
    });

    expect(screen.getByLabelText("Email address").value).toBe("harsh@gmail.com");
    expect(screen.getByLabelText("Password").value).toBe("12345");
  });
});
