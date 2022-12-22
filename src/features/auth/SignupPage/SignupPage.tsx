import { registerWithEmailAndPassword } from '@/services/firebase/auth';
import { sendEmailVerification } from 'firebase/auth';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const navigate = useNavigate();

  const clickSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get('email'),
      name = data.get('name'),
      password = data.get('password');

    if (!name || !email || !password) return alert('Form value are incorrect');

    registerWithEmailAndPassword(name?.toString(), email.toString(), password.toString()).then(
      (user) => {
        if (user) {
          sendEmailVerification(user)
            .then(() => {
              navigate('/auth/verify-email');
            })
            .catch((err: any) => {
              console.log(err.message);
            });
        }
      },
    );
  };

  return (
    <div className='bg-gray-800 text-white rounded p-24 w-full max-w-[360px]'>
      <h1 className='text-white text-h3 mb-24'>Sign Up</h1>
      <form onSubmit={clickSubmitForm} className='flex flex-col gap-8'>
        <input name='name' type='text' className='w-full p-8' placeholder='Username' />
        <input name='email' type='text' className='w-full p-8' placeholder='Email' />
        <input name='password' type='password' className='w-full p-8' placeholder='Password' />
        <button className='bg-gray-900 text-gray-100 p-8 w-full rounded font-bold mt-8'>
          Create Account
        </button>
      </form>
    </div>
  );
}
