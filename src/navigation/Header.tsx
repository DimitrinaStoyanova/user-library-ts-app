import { Outlet, Link, useLocation } from "react-router-dom";
import { Routes } from "../models/Routes";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setFilter } from "../store/userSlice";

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.userSlice.filter);
  const isUsersRoute = location.pathname === Routes.USERS;

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div>
      <header className="bg-primary text-white fixed-top">
        <div className="container-fluid d-flex justify-content-between align-items-center py-2">
          <p className="mb-0">User Library TypeScript App</p>
          {isUsersRoute ? (
            <div>
              <input
                type="text"
                placeholder="Filter users by name..."
                value={filter}
                onChange={handleFilterChange}
              />
            </div>
          ) : (
            <></>
          )}
          <div className="d-flex">
            <Link className="nav-link text-white me-3" to={Routes.DASHBOARD}>
              Dashboard
            </Link>
            <Link className="nav-link text-white" to={Routes.USERS}>
              Users
            </Link>
          </div>
        </div>
      </header>
      <div className="mt-5">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Header;
