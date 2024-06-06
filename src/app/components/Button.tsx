import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="text-lg bg-green-400 hover:bg-green-500 text-black hover:text-white font-bold py-2 px-4 rounded"
    >
      {children}
    </button>
  );
};

export default Button;
