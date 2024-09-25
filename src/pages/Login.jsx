import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import loginImage from '../assets/image/login.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { loginUser } from '../redux/features/user/authSlice';


const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.isAuthenticated) {
      toast.success('Login successful!');
      navigate('/');
    }
    if (auth.error) {
      toast.error(auth.error);
    }
  }, [auth, navigate]);

  const onSubmit = ({ email, password }) => {
    // Email Password Login
    dispatch(loginUser({ email, password }));
    // console.log(email, password);
  };

  return (
    // <div className="flex max-w-7xl h-screen items-center mx-auto">
    //   <div className="w-1/2">
    //     <img src={loginImage} className="h-full w-full" alt="" />
    //   </div>
    <div className="grid h-[100vh] place-items-center mx-auto bg-primary/5 py-8">
        <div className="shadow-lg w-full max-w-sm rounded-lg px-6 md:px-10 py-8">
          <h1 className="mb-10 font-medium text-2xl text-center">Login</h1>
          <form className="space-y-3 w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-start">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="w-full rounded-md"
                {...register('email', { required: 'Email is required' })}
                // required
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email?.message}</p>
              )}
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="w-full rounded-md"
                {...register('password', { required: 'Password is required' })}
                // required
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>
            <div className="relative !mt-8">
              <button type="submit" className="btn btn-primary w-full">
                Login
              </button>
            </div>
            <div className='text-center'>
              <p>
                Don&apos;t have an account?{' '}
                <span
                  className="text-primary hover:underline cursor-pointer"
                  onClick={() => navigate('/signup')}
                >
                  Sign up
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    // </div>
  );
};

export default Login;
