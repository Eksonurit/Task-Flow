import { Route, Routes } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import { StrictMode } from "react";
import { BrowserRouter as Router } from "react-router";
import App from "./App";

export const Root: React.FC = () => {
  return (
    <Router>
      <Provider store={store}>
        <StrictMode>
          <Routes>
            <Route path="/" element={<App></App>}></Route>
          </Routes>
        </StrictMode>
      </Provider>
    </Router>
  );
};
