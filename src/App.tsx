import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { store } from "./store/store";
import theme from "./theme/theme";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts";
import Timeline from "./pages/Timeline";
import { PrivateRoute } from "./components/PrivateRoute";

const routesConfig = [
  { path: "/login", element: <Login />, private: false },
  { path: "/dashboard", element: <Dashboard />, private: true },
  { path: "/contacts", element: <Contacts />, private: true },
  { path: "/timeline", element: <Timeline />, private: true },
];

const App = () => {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />

      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              {routesConfig.map(({ path, element, private: isPrivate }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    isPrivate ? <PrivateRoute>{element}</PrivateRoute> : element
                  }
                />
              ))}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </BrowserRouter>
        </ChakraProvider>
      </Provider>
    </>
  );
};

export default App;
