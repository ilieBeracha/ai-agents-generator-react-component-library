import React, { useState } from "react";

interface ABeautifulFormComponentProps {
  label?: string;
  styleType?: "primary" | "secondary";
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick: () => void;
}

const defaultProps: ABeautifulFormComponentProps = {
  label: "Submit",
  styleType: "primary",
  isDisabled: false,
  isLoading: false,
  onClick: () => console.log("Button clicked!"),
};

export default function ABeautifulFormComponent({
  label,
  styleType,
  isDisabled,
  isLoading,
  onClick,
}: ABeautifulFormComponentProps) {
  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    username: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = () => {
    const newErrors: any = {};
    // Example validation logic
    if (!formValues.firstname) newErrors.firstname = "Firstname is required";
    if (!formValues.lastname) newErrors.lastname = "Lastname is required";
    if (!formValues.email) newErrors.email = "Email is required";
    if (!formValues.password) newErrors.password = "Password is required";
    if (!formValues.username) newErrors.username = "Username is required";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      onClick(); // Call the onClick prop
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <div>
        <label
          htmlFor="firstname"
          className="block text-sm font-medium text-gray-700"
        >
          Firstname
        </label>
        <input
          type="text"
          name="firstname"
          placeholder="Enter your firstname"
          value={formValues.firstname}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          aria-describedby="firstname-error"
        />
        {errors.firstname && (
          <span id="firstname-error" className="text-red-600 text-sm">
            {errors.firstname}
          </span>
        )}
      </div>
      <div>
        <label
          htmlFor="lastname"
          className="block text-sm font-medium text-gray-700"
        >
          Lastname
        </label>
        <input
          type="text"
          name="lastname"
          placeholder="Enter your lastname"
          value={formValues.lastname}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          aria-describedby="lastname-error"
        />
        {errors.lastname && (
          <span id="lastname-error" className="text-red-600 text-sm">
            {errors.lastname}
          </span>
        )}
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formValues.email}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          aria-describedby="email-error"
        />
        {errors.email && (
          <span id="email-error" className="text-red-600 text-sm">
            {errors.email}
          </span>
        )}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formValues.password}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          aria-describedby="password-error"
        />
        {errors.password && (
          <span id="password-error" className="text-red-600 text-sm">
            {errors.password}
          </span>
        )}
      </div>
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          value={formValues.username}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          aria-describedby="username-error"
        />
        {errors.username && (
          <span id="username-error" className="text-red-600 text-sm">
            {errors.username}
          </span>
        )}
      </div>
      <button
        className={`mt-4 px-4 py-2 font-semibold text-white rounded-lg focus:outline-none transition duration-300 ease-in-out ${
          styleType === "primary"
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-gray-500 hover:bg-gray-600"
        } ${isDisabled ? "bg-gray-300 cursor-not-allowed" : ""} ${
          isLoading ? "opacity-50" : ""
        }`}
        onClick={!isDisabled ? onClick : undefined}
        disabled={isDisabled}
        aria-busy={isLoading}
      >
        {isLoading ? (
          <span className="loader animation-spin inline-block mr-2"></span>
        ) : (
          label
        )}
      </button>
    </form>
  );
}

ABeautifulFormComponent.defaultProps = defaultProps;
