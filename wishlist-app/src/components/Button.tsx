import clsx from 'clsx';

type Variant = 'primary' | 'secondary' | 'danger' | 'success';
type Size = 'sm' | 'md' | 'lg';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  icon,
  children,
  ...rest
}: Props) {
  const baseStyles = 'rounded font-medium transition-colors';

  const variantStyles: Record<Variant, string> = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    success: 'bg-[#7FB51E] text-white hover:bg-[#7AA900]',
  };

  const sizeStyles: Record<Size, string> = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-3 text-lg',
  };

  return (
    <button
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}
