'use client'
import React, { useState, InputHTMLAttributes } from 'react'
import clsx from 'clsx';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { cn } from '@nextui-org/react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  inputClassName?: string;
  containerClassName?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  labelClassName = '',
  inputClassName = '',
  containerClassName = '',
  ...rest
}) => {
  const [showPreview, setShowPreview] = useState(false);

  const handleTogglePreview = () => {
    setShowPreview(prev => !prev);
  };

  return (
    <label className={cn('w-full block', containerClassName)}>
      {label && <p className={cn('text-[.9rem] mb-1', labelClassName)}>{label}</p>}
      <div className={cn('bg-white dark:bg-sidebar w-full h-11 flex items-center justify-start p-3 rounded-lg')}>
        <input
          className={cn(
            'h-[40px] w-full px-3 bg-white dark:bg-sidebar border border-theme rounded-lg focus:outline-none focus:ring-2 focus:ring-primary',
            inputClassName
          )}
          type={rest.type === 'password' ? (showPreview ? 'text' : 'password') : rest.type}
          {...rest}
        />
        {rest.type === 'password' && (
          <div onClick={handleTogglePreview} className='ml-2 cursor-pointer'>
            {showPreview ? <BsEyeSlash /> : <BsEye />}
          </div>
        )}
      </div>
    </label>
  );
};

export default Input;