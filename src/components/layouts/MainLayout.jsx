import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const MainLayout = () => {
  return (
    <div className="flex">
      <div className="w-[50px] md:w-[80px] h-full fixed top-0 left-0">
        <Sidebar />
      </div>
      <div className="flex-1 ml-[50px] md:ml-[80px]">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
