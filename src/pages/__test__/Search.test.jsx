import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { describe, it, expect, beforeEach, vi } from "vitest";
import Search from "../../components/Search";
import { MemoryRouter } from "react-router-dom";
import themeReducer from "../../store/slice/themeSlice";
import stocksReducer from "../../store/slice/stockSlice";
import searchReducer from "../../store/slice/searchQuerySlice";

const mockStore = configureMockStore([]);

const renderWithStore = (ui, { preloadedState, store } = {}) => {
  store = store || mockStore(preloadedState);
  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
};

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const initialState = {
  theme: { mode: "light" },
  stocks: {
    stocks: [
      { name: "Apple Inc.", ticker: "AAPL" },
      { name: "Microsoft Corp", ticker: "MSFT" },
      { name: "Alphabet Inc.", ticker: "GOOGL" },
    ],
  },
  search: {
    query: "",
    results: [],
  },
};

describe("Search Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    vi.clearAllMocks();
  });

  it("renders the search input and button", () => {
    renderWithStore(<Search />, { store });
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it("shows suggestions when typing in the input", () => {
    renderWithStore(<Search />, { store });
    const input = screen.getByPlaceholderText(/Type a Company Name/i);
    fireEvent.change(input, { target: { value: "App" } });
    expect(screen.getByText(/Apple Inc./i)).toBeInTheDocument();
  });

  it("selects a suggestion when clicked", () => {
    renderWithStore(<Search />, { store });
    const input = screen.getByPlaceholderText(/Type a Company Name/i);
    fireEvent.change(input, { target: { value: "App" } });
    const suggestion = screen.getByText(/Apple Inc./i);
    fireEvent.click(suggestion);
    expect(input.value).toBe("Apple Inc.");
  });

  it("navigates to the correct route when a suggestion is clicked", () => {
    renderWithStore(<Search />, { store });
    const input = screen.getByPlaceholderText(/Type a Company Name/i);
    fireEvent.change(input, { target: { value: "App" } });
    fireEvent.click(screen.getByText(/Apple Inc./i));
    expect(mockNavigate).toHaveBeenCalledWith("/company/AAPL");
  });

  it("closes suggestions on clicking outside", () => {
    const { container } = renderWithStore(<Search />, { store });
    const input = screen.getByPlaceholderText(/Type a Company Name/i);
    fireEvent.change(input, { target: { value: "App" } });
    const suggestion = screen.getByText(/Apple Inc./i);
    expect(suggestion).toBeVisible();
    fireEvent.mouseDown(container);
    expect(screen.queryByText(/Apple Inc./i)).not.toBeInTheDocument();
  });

  it("hides suggestions when escape key is pressed", () => {
    renderWithStore(<Search />, { store });
    const input = screen.getByPlaceholderText(/Type a Company Name/i);
    fireEvent.change(input, { target: { value: "A" } });
    const suggestion = screen.getByText(/Apple Inc./i);
    expect(suggestion).toBeVisible();
    fireEvent.keyDown(input, { key: "Escape" });
    expect(screen.queryByText(/Apple Inc./i)).not.toBeInTheDocument();
  });
});
