import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../redux/features/user/authSlice';

const Signup = () => {
  const { handleSubmit, register, control, formState: { errors } } = useForm();
  const password = useWatch({ control, name: 'password' });
  const confirmPassword = useWatch({ control, name: 'confirmPassword' });
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (
      password !== undefined &&
      password !== '' &&
      confirmPassword !== undefined &&
      confirmPassword !== '' &&
      password === confirmPassword
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      toast.success('Registration successful!');
      navigate('/');
    }
    if (auth.error) {
      toast.error(auth.error);
    }
  }, [auth, navigate]);

  const onSubmit = ({ name, email, password }) => {
    // Email Password signup
    // console.log(name, email, password);
    dispatch(registerUser({ name, email, password }));
  };

  return (
    // <div className="flex mx-auto h-screen items-center justify-center bg-primary/5">
      <div className="grid place-items-center mx-auto bg-primary/5 py-8">
        <div className="shadow-lg w-full max-w-sm rounded-lg px-6 md:px-10 py-8 bg-white">
          <h1 className="mb-8 font-medium text-2xl text-center">Sign up</h1>
          <form className="space-y-5 w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-start">
              <label htmlFor="email">Name</label>
              <input
                type="text"
                id="name"
                className="w-full rounded-md"
                {...register('name', {
                  required: 'Name is required'
                })}
                // required
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="w-full rounded-md"
                {...register('email', {
                  required: 'Email is required'
                })}
                // required
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="w-full rounded-md"
                {...register('password', {
                  required: 'Password is required'
                })}
                // required
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                className="w-full rounded-md"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === password || 'Passwords do not match',
                })}
                // required
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div className="!mt-8 ">
              <button
                type="submit"
                className="btn btn-primary w-full disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={disabled}
              >
                Sign up
              </button>
            </div>
            <div className='text-center'>
              <p>
                Already have an account?{' '}
                <span
                  className="text-primary hover:underline cursor-pointer"
                  onClick={() => navigate('/login')}
                >
                  Login
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    // </div>
  );
};

export default Signup;
