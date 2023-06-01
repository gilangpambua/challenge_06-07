import { Routes, BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import store from "./redux/store";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Protected from "./components/Protected";
import Dashboard from "./pages/users/Dashboard";
import RedirectIfProtected from "./components/RedirectlfProtected";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Detail from "./pages/Detail";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <BrowserRouter>
          {/* <Header /> */}

          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/register"
              element={
                <RedirectIfProtected>
                  <Register />
                </RedirectIfProtected>
              }
            />
            <Route
              path="/login"
              element={
                <RedirectIfProtected>
                  <Login />
                </RedirectIfProtected>
              }
            />

            <Route
              path="/user/dashboard"
              element={
                <Protected>
                  <Dashboard />
                </Protected>
              }
            />
            <Route path="/detail" element={<Detail />} />
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>

          <ToastContainer theme="colored" />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </Provider>
  );
}

export default App;
