import {
  BrowserRouter as Router,
  Routes as BrowserRoutes,
  Route,
} from "react-router-dom";
import { Routes } from "../models/Routes";
import UsersPage from "../pages/UsersPage";
import Header from "../navigation/Header";
import UserDetailsPage from "../pages/UserArticlesPage";

const MainRouter = () => {
  return (
    <Router>
      <BrowserRoutes>
          <Route element={<Header />}>
            <Route path={Routes.DASHBOARD} element={<div>Dashboard</div>} />
            <Route path={Routes.USERS} element={<UsersPage />} />
            <Route path={Routes.USER} element={<UserDetailsPage />} />
            <Route path="*" element={<div>page not found</div> } />
          </Route>
      </BrowserRoutes>
    </Router>
  );
};

export default MainRouter;
