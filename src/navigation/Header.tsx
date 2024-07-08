import { Outlet, Link } from 'react-router-dom';
import { Routes } from '../models/Routes';
import Footer from './Footer';

const Header = () => {
  return (
    <div>
      <header className="bg-primary text-white fixed-top">
        <div className="container-fluid d-flex justify-content-between align-items-center py-2">
            <p className='mb-0'>User Library TypeScript App</p>
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
      <Footer/>
    </div>
  );
};

export default Header;
