function Button({ children, ...props }) {
  return <button className="w-full py-2 text-white bg-gradient-to-r from-teal-400 to-secondaryDark rounded-md hover:from-primary hover:to-secondary" {...props} >{children}</button>;
}

export default Button;
