import { memo, ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default memo(function Button({ children, ...otherProps }: ButtonProps) {
  return (
    <button
      className="py-2 px-4 rounded text-sm bg-blue-600 hover:bg-blue-700 text-white"
      {...otherProps}>
      {children}
    </button>
  );
});
