import React, { useState } from 'react';

interface ABeautifulFormComponentProps {
  onSubmit: (data: FormData) => void;
}

const defaultProps: ABeautifulFormComponentProps = {
  onSubmit: (data: FormData) => console.log('Form submitted with data:', data),
};

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  username: string;
}

export default function ABeautifulFormComponent({ onSubmit }: ABeautifulFormComponentProps) {
  const [formData, setFormData] = useState<FormData>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    username: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors: Partial<FormData> = {};
    if (!formData.firstname) validationErrors.firstname = 'Firstname is required';
    if (!formData.email) validationErrors.email = 'Email is required';
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} aria-label="A beautiful form component" className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg space-y-4">
      <div>
        <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">Firstname</label>
        <input
          type="text"
          name="firstname"
          id="firstname"
          value={formData.firstname}
          onChange={handleChange}
          placeholder="Enter your firstname"
          aria-describedby="firstname-error"
          className={`mt-1 block w-full border rounded-md shadow-sm p-2 ${errors.firstname ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-gray-200`} // Added Tailwind classes
        />
        {errors.firstname && <span id="firstname-error" className="text-red-500 text-sm">{errors.firstname}</span>}
      </div>
      <div>
        <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Lastname</label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          value={formData.lastname}
          onChange={handleChange}
          placeholder="Enter your lastname"
          className="mt-1 block w-full border rounded-md shadow-sm p-2 border-gray-300 focus:ring focus:ring-gray-200"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          aria-describedby="email-error"
          className={`mt-1 block w-full border rounded-md shadow-sm p-2 ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-gray-200`} // Added Tailwind classes
        />
        {errors.email && <span id="email-error" className="text-red-500 text-sm">{errors.email}</span>}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="mt-1 block w-full border rounded-md shadow-sm p-2 border-gray-300 focus:ring focus:ring-gray-200"
        />
      </div>
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your username"
          className="mt-1 block w-full border rounded-md shadow-sm p-2 border-gray-300 focus:ring focus:ring-gray-200"
        />
      </div>
      <button type="submit" className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300">Submit</button>
    </form>
  );
};

ABeautifulFormComponent.defaultProps = defaultProps;