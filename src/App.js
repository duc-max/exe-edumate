import { Fragment, useContext, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import DefaultLayout from "../src/layouts/DefaultLayout";
import { publicRoutes } from "../src/routers";
import { AuthContext } from "./context/auth";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  const { setUser, setIsLogin } = useContext(AuthContext);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLogin(true);
      setUser(JSON.parse(user));
    }
  }, [setIsLogin, setUser]);
  return (
    <div className="App">
      <Router>
        <div className="App">
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              let Layout = DefaultLayout;
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              } else if (route.header === null) {
                Layout = DashboardLayout;
              }
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
