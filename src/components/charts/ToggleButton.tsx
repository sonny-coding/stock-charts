"use client";

type ToggleButtonProps = {
  label: string;
  handleClick: () => void;
  isAnnual: boolean;
};

const ToggleButton = ({ label, handleClick, isAnnual }: ToggleButtonProps) => {
  return (
    <button
      onClick={handleClick}
      className={`bg-secondary text-[10px] leading-none lg:text-xs hover:opacity-60 py-1 px-2 lg:py-2 lg:px-3 border-b-2 ${
        isAnnual ? "border-black" : "text-slate-500"
      }`}
    >
      {label}
    </button>
  );
};

export default ToggleButton;
