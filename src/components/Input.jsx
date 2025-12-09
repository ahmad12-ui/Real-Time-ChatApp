import { forwardRef } from "react";
import { useId } from "react";

function Input(
  { children, type = "text", className = "", label = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-gray-300">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={`px-3 py-2 rounded bg-gray-900 text-white border border-gray-700 ${className}`}
        ref={ref}
        {...props}
      />
    </div>
  );
}

export default forwardRef(Input);
