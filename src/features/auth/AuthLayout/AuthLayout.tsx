import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className='flex flex-col justify-center items-center min-h-[90vh]'>
      <Outlet />
    </div>
  );
}
