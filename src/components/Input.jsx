import { forwardRef } from "react";
import { useId } from "react";

function Input(
  { children, type = "text", className = "", label = "", ...props },
  ref
) {
  const id = useId();

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-semibold text-gray-300 tracking-wide"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={`
          px-5 py-4 
          rounded-2xl 
          bg-gray-800/50 
          text-white 
          placeholder-gray-500 
          border border-gray-700 
          focus:border-[#8B0000] 
          focus:outline-none 
          focus:ring-4 
          focus:ring-[#8B0000]/30 
          transition-all 
          duration-300 
          shadow-inner
          ${className}
        `}
        ref={ref}
        {...props}
      />
    </div>
  );
}

export default forwardRef(Input);
