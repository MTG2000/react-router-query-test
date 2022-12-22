import { useAuthUser } from '@/contexts/userContext';
import { logInWithEmailAndPassword, signInWithGoogle } from '@/services/firebase/auth';
import { sendEmailVerification } from 'firebase/auth';
import { FormEvent, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignInPage() {
  const formRef = useRef<HTMLFormElement>(null!);

  const clickSignInGoogle = () => {
    signInWithGoogle();
  };

  const navigate = useNavigate();

  const user = useAuthUser();

  useEffect(() => {
    if (!user) return;

    if (user.emailVerified) navigate('/');
    else navigate('/auth/verify-email');
  }, [navigate, user]);

  const clickSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get('email'),
      password = data.get('password');

    if (!email || !password) return alert('Form value are incorrect');

    logInWithEmailAndPassword(email.toString(), password.toString());
  };

  return (
    <div className='bg-gray-800 text-white rounded p-24 w-full max-w-[360px]'>
      <h1 className='text-white text-h3 mb-24'>Sign In</h1>
      <p className='mb-12'>Using Email & Password:</p>
      <form onSubmit={clickSubmitForm} ref={formRef} className='flex flex-col gap-8'>
        <input name='email' type='text' className='w-full p-8' placeholder='email' />
        <input name='password' type='password' className='w-full p-8' placeholder='password' />
        <button className='bg-gray-900 text-gray-100 p-8 w-full rounded font-bold mt-8'>
          Sign In
        </button>
      </form>
      <p className='text-white my-16 text-center'>OR</p>
      <div className='flex flex-col gap-12'>
        <button
          className='bg-gray-100 text-gray-900 p-8 w-full rounded font-bold'
          onClick={clickSignInGoogle}
        >
          Sign in with Google
        </button>
        <button
          className='bg-gray-100 text-gray-900 p-8 w-full rounded font-bold'
          onClick={clickSignInGoogle}
        >
          Sign in with Github
        </button>
      </div>
      <p className='mt-24 text-body5'>
        Dont have an account yet?{' '}
        <Link to='../sign-up' className='text-blue-400'>
          Create One
        </Link>
      </p>
    </div>
  );
}
