function Button({
  type = "button",
  bgcolor = "bg-black",
  children,
  textcolor = "text-white",
  className = "",
  ...props
}) {
  return (
    <div>
      <button
        type={type}
        className={`${bgcolor} ${textcolor} px-4 py-2 rounded ${className}`}
        {...props}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
