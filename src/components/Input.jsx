function Input({label, id, ...props}) {
  return (
    <>
      <div className="flex flex-col text-white gap-y-1 mb-4">
       <label className="block text-sm font-medium text-gray-300" htmlFor={id}>
        {label}
        </label>
        <input {...props} id={id} className="w-full px-4 py-2 mt-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
      </div>
    </>
  );
}

export default Input;
