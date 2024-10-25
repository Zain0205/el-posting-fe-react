function Button({ children, ...props }) {
  return <button className="bg-primary w-full py-3 rounded-full text-white hover:bg-transparent border border-primary hover:text-primary shadow-md shadow-teal-200" {...props} >{children}</button>;
}

export default Button;
