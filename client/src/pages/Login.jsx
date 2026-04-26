import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/auth/AuthForm';
import InputField from '../components/ui/InputField';
import Button from '../components/ui/Button';
import ErrorMessage from '../components/ui/ErrorMessage';
import toastr from 'toastr';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalError('');
    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Invalid email or password');
      }

      toastr.success('Successfully logged in!');
      // Assuming backend returns { user: { ... }, token: "jwt_token" }
      login(data.user || data, data.token || "mocked_token_replace_me");
      
      const userRole = data.user?.role || data.role;
      const adminForward = userRole === 'admin' ? '/admin' : '/';
      let from = location.state?.from?.pathname || adminForward;

      if (userRole === 'admin' && from === '/') {
        from = '/admin';
      }

      navigate(from, { replace: true });
    } catch (err) {
      setGlobalError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm 
      title="Welcome Back" 
      subtitle="Enter your details to access your account."
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <ErrorMessage message={globalError} type="error" onClose={() => setGlobalError('')} />
        
        <InputField
          id="email"
          type="email"
          label="Email Address"
          placeholder="name@example.com"
          icon={Mail}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
        />

        <div>
          <InputField
            id="password"
            type="password"
            label="Password"
            placeholder="••••••••"
            icon={Lock}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={errors.password}
          />
          <div className="flex justify-end mt-2">
            <a href="#" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
              Forgot password?
            </a>
          </div>
        </div>

        <div className="pt-2">
          <Button type="submit" fullWidth isLoading={isLoading}>
            <LogIn className="w-5 h-5 mr-1" />
            Sign In
          </Button>
        </div>

        <div className="text-center text-sm text-slate-400 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
            Create an account
          </Link>
        </div>
      </form>
    </AuthForm>
  );
};

export default Login;
