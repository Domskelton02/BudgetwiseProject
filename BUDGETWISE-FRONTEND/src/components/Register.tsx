import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/apiService';
import axios from 'axios';


interface FormData {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  name?: string;
  confirmPassword?: string;
  submit?: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // useNavigate for navigation

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const validate = (values: FormData): FormErrors => {
    const validationErrors: FormErrors = {};
    // Validation logic remains the same
    // ...
    return validationErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newErrors = validate(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const { confirmPassword, ...userData } = formData;
        const response = await authService.register(userData);
        localStorage.setItem('authToken', response.data.token);
        // Redirect to dashboard...
      } catch (error) {
        setIsSubmitting(false);
        if (axios.isAxiosError(error) && error.response) {
          // If the error is from Axios and there is a response with the error message, log it and set it
          console.error('Registration error:', error.response.data);
          setErrors({ submit: error.response.data.message || 'An unknown error occurred during registration.' });
        } else {
          // If the error is not from Axios, log the error object
          console.error('Registration error:', error);
          setErrors({ submit: 'An unknown error occurred during registration.' });
        }
      }
    }
  };
  

  return (
<div className="register-container">
  <form className="register-form" onSubmit={handleSubmit}>
    <h2>Register</h2>
    
    <div>
      <label htmlFor="name">Full Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      {errors.name && <p className="error">{errors.name}</p>}
    </div>

    <div>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      {errors.email && <p className="error">{errors.email}</p>}
    </div>

    <div>
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      {errors.password && <p className="error">{errors.password}</p>}
    </div>

    <div>
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />
      {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
    </div>

    <button type="submit" disabled={isSubmitting}>Register</button>
    {errors.submit && <p className="error">{errors.submit}</p>}
  </form>
</div>

  );
};

export default Register;
