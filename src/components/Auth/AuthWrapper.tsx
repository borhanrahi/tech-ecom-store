"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { account } from '@/lib/appwrite';
import { login, logout } from '@/redux/features/authSlice';

export const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await account.get();
        dispatch(login({
          user: {
            id: user.$id,
            name: user.name,
            email: user.email
          },
          accessToken: "appwrite-session"
        }));
      } catch (error) {
        dispatch(logout());
      }
    };
    
    checkSession();
  }, [dispatch]);

  return children;
}; 