import { useAuthUser } from '@/contexts/userContext';
import { sendEmailVerification } from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VerifyEmail() {
  const user = useAuthUser();
  const navigate = useNavigate();

  const sendEmail = () => {
    if (user?.email) sendEmailVerification(user);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (user?.emailVerified) navigate('/');
      else user?.reload();
    }, 1000);
    return () => clearInterval(interval);
  }, [navigate, user]);

  return (
    <div className='bg-gray-800 text-white rounded p-24 w-full max-w-[360px]'>
      <h1 className='text-white text-h3 mb-24'>Verify Your Email</h1>
      <p>
        We sent a verification code to your email: <span className='font-bold'>{user?.email}</span>
      </p>
      <p>
        Please check your inbox & spam folder, then click the link there, then come back to this
        page
      </p>
      <button
        className='text-center bg-gray-100 p-8 text-gray-900 w-full rounded mt-16'
        onClick={sendEmail}
      >
        Resend Verification Email
      </button>
    </div>
  );
}
