"use client";
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type PasswordInputProps = {
  id: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
};

const PasswordInput = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  className = '',
  required = false
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        name={name || id}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`auth-input pr-10 ${className}`}
      />
      
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-5 hover:text-dark transition-colors"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <EyeOff size={18} strokeWidth={1.5} />
        ) : (
          <Eye size={18} strokeWidth={1.5} />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;