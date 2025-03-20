import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import Home from "../Home";
import '@testing-library/jest-dom'; 

const mockStore = configureStore([]);

test("renders Home page", () => {
  const store = mockStore({
    stocks: [],
    theme: { theme: "light" },
  });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByText(/Analyse your stock with all the data in one place/i)).toBeInTheDocument();
  expect(screen.getByText(/Our Data will help you to pick better stocks for better return/i)).toBeInTheDocument();
});