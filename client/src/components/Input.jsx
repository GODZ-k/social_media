import React ,{forwardRef , useId} from "react";

function Input({label , name , type = "text", placeholder , className, required = true , ...props } ,ref ) {
    const id = useId()
  return (
    <>
      {label && (
        <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      )}
      <input
        type={type}
        name={name}
        ref={ref}
        id={id}
        className={`${ className } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        placeholder={placeholder}
        required={required}
        {...props}
      />
    </>
  );
}

export default forwardRef(Input);
