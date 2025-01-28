import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { account, ID } from '@/lib/appwrite';
import { login } from '@/redux/features/authSlice';

type AuthType = 'signup' | 'signin';

const useAuthForm = (type: AuthType) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent, data: {
    email: string;
    password: string;
    name?: string;
    confirmPassword?: string;
  }) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (type === 'signup' && data.password !== data.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (type === 'signup') {
        await account.create(ID.unique(), data.email, data.password, data.name);
        setSuccess('Account created successfully! Redirecting...');
      }

      const session = await account.createSession(data.email, data.password);
      dispatch(login({
        user: { email: data.email, name: data.name || '' },
        accessToken: session.providerAccessToken
      }));

      router.push('/');
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading, error, success };
};

export default useAuthForm; 