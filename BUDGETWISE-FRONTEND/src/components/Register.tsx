import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { authService } from '../services/apiService'; // Make sure this path is correct
import './Register.css';

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
  const history = useHistory();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const validate = (values: FormData): FormErrors => {
    const validationErrors: FormErrors = {};
    if (!values.name.trim()) validationErrors.name = 'Name is required';
    if (!values.email) validationErrors.email = 'Email address is required';
    else if (!/\S+@\S+\.\S+/.test(values.email)) validationErrors.email = 'Email address is invalid';
    if (!values.password) validationErrors.password = 'Password is required';
    else if (values.password.length < 8) validationErrors.password = 'Password must be at least 8 characters';
    else if (!/\d/.test(values.password) || !/[a-zA-Z]/.test(values.password)) validationErrors.password = 'Password must contain at least 1 letter and 1 number';
    if (!values.confirmPassword) validationErrors.confirmPassword = 'Please confirm your password';
    else if (values.confirmPassword !== values.password) validationErrors.confirmPassword = 'Passwords do not match';
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
        localStorage.setItem('authToken', response.data.token); // Make sure the response has a token property
        history.push('/dashboard'); // Redirect to the dashboard
      } catch (error) {
        setIsSubmitting(false);
        setErrors({ submit: 'An error occurred during registration.' });
        if (error.response) {
          setErrors({ submit: error.response.data.message });
        }
      }
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {/* ... form fields ... */}
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
