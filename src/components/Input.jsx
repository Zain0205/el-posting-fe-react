function Input({label, type, id, name, placeholder}) {
  return (
    <>
      <div className="flex flex-col text-white gap-y-2 mb-4">
       <label className="block text-sm font-medium text-gray-300" htmlFor="email">
        {label}
        </label>
        <input className="w-full px-4 py-2 mt-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" type={type} placeholder={placeholder} id={id} name={name} />
      </div>
    </>
  );
}

export default Input;