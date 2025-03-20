import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import AboutUs from "../../pages/About";
import "@testing-library/jest-dom"; 

const mockStore = configureStore([]);

test("renders About Us page", () => {
  const store = mockStore({
    theme: { theme: "light" },
  });

  render(
    <Provider store={store}>
      <AboutUs />
    </Provider>
  );

  expect(screen.getByText(/About Us/i)).toBeInTheDocument();
  expect(screen.getByText(/Welcome to our Stock Analysis Hub/i)).toBeInTheDocument();
  expect(screen.getByText(/At Stock Analysis Hub, we are passionate about empowering investors/i)).toBeInTheDocument();
  expect(screen.getByText(/Our Vision/i)).toBeInTheDocument();
  expect(screen.getByText(/What We Offer/i)).toBeInTheDocument();
  expect(screen.getByText(/Join Us on This Journey/i)).toBeInTheDocument();
});
