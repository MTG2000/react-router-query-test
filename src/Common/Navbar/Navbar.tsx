import { useAuthUser } from '@/contexts/userContext';
import { logout } from '@/services/firebase/auth';
import { Link, NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export default function Navbar() {
  const user = useAuthUser();

  const clickLogout = () => logout();

  return (
    <nav className='bg-black py-24 px-32 grid grid-cols-3 justify-between items-center sticky top-0'>
      <Link to='/' className='text-body1 text-white hover:text-white font-bold'>
        Router + Query + Rick & Morty
      </Link>

      <ul className='flex gap-16 mx-auto'>
        <li>
          <NavLink
            className={({ isActive, isPending }) =>
              twMerge(
                `text-body3 text-white
              ${!isActive && !isPending && 'hover:text-gray-300'}
               ${isPending && 'text-orange-300'} ${
                  isActive && 'text-violet-400 underline underline-offset-4'
                }`,
              )
            }
            to='/characters'
            state={{ loadingText: 'Fetching characters...' }}
          >
            Characters
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive, isPending }) =>
              twMerge(
                `text-body3 text-white
              ${!isActive && !isPending && 'hover:text-gray-300'}
              ${isPending && 'text-orange-300'} ${
                  isActive && 'text-violet-400 underline underline-offset-4'
                }`,
              )
            }
            to='/episodes'
            state={{ loadingText: 'Fetching episodes...' }}
          >
            Episodes
          </NavLink>
        </li>
      </ul>
      <div className='ml-auto'>
        {user ? (
          <div className='flex gap-8'>
            <Link className='text-white underline font-bold' to='/profile'>
              {user.uid?.slice(0, 5)}...
            </Link>
            <button onClick={clickLogout}>Logout</button>
          </div>
        ) : (
          <Link className='text-white underline font-bold' to='/auth/sign-in'>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
