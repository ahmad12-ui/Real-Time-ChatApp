function Button({ type = "button", children, className = "", ...props }) {
  return (
    <button
      type={type}
      className={`
        relative overflow-hidden
        px-8 py-2
        bg-[#8B0000] hover:bg-maroon-700
        text-white font-bold text-lg
        rounded-2xl
        shadow-xl
        border border-maroon-800
        transition-all duration-500
        transform hover:scale-105
        hover:shadow-2xl hover:shadow-[#8B0000]/60
        focus:outline-none focus:ring-4 focus:ring-[#8B0000]/50
        ${className}
      `}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-maroon-600 opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
    </button>
  );
}

export default Button;
