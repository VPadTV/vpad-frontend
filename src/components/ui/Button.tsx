import { cn } from '@nextui-org/react';
import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' |"destructive";
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...rest
}) => {
  const baseStyles = 'rounded-lg font-medium transition-colors focus:outline-none';
  
  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-secondary hover:text-white',
    secondary: 'bg-accent text-white hover:bg-secondary hover:text-white',
    danger: 'bg-danger text-white hover:opacity-90 hover:text-gray-100',
    outline: 'border border-primary text-primary bg-transparent hover:bg-primary hover:bg-opacity-10 hover:text-white',
    destructive: 'bg-danger text-white hover:opacity-90 hover:text-gray-100'
  };
  
  const sizeStyles = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};