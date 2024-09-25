// pages/Profile.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { loadUserProfile, updateUserProfile } from '../redux/features/user/authSlice';
import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import MenuDropdown from '../components/ui/MenuDropdown';
import Loading from "../components/layouts/Loading"

const Profile = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    confirmPassword: '',
  });
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (!auth.user) {
      dispatch(loadUserProfile());
    } else {
      setFormData({
        name: auth.user.name,
        password: '',
        confirmPassword: '',
      });
    }
  }, [dispatch, auth.user]);

  useEffect(() => {
    if (auth.error) {
      toast.error(auth.error);
    }
    // if (auth.user && auth.user.name) {
    //   toast.success('Profile loaded successfully.');
    // }
  }, [auth.error, auth.user]);

  useEffect(() => {
    const { name, password, confirmPassword } = formData;
    if (name !== auth.user?.name || (password && password === confirmPassword)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [formData, auth.user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const { name, password } = formData;
    const updateData = {};
    if (name !== auth.user.name) updateData.name = name;
    if (password) updateData.password = password;

    if (Object.keys(updateData).length === 0) {
      toast.error('No changes to update.');
      return;
    }

    dispatch(updateUserProfile(updateData))
      .unwrap()
      .then(() => {
        toast.success('Profile updated successfully.');
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <div className=" px-3 md:px-10 pt-4 bg-primary/5">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-semibold text-2xl md:text-3xl">Profile</h1>
        </div>
        <div className="flex items-center gap-2 md:gap-5">
          <button className="border-2 border-secondary/20 hover:border-primary hover:bg-primary rounded-xl h-8 md:h-10 w-10  grid place-content-center text-secondary hover:text-white transition-all">
            <MagnifyingGlassIcon className="h-4 md:h-6 w-4 md:w-6" />
          </button>
          <button className="border-2 border-secondary/20 hover:border-primary hover:bg-primary rounded-xl h-8 md:h-10 w-10 grid place-content-center text-secondary hover:text-white transition-all">
            <BellIcon className="h-4 md:h-6 w-4 md:w-6" />
          </button>
          {/* <button
            onClick={() => setIsOpen(!isOpen)}
            className="btn btn-primary"
          >
            Add Task
          </button> */}
          <MenuDropdown>
            <div className="h-10 w-10 rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=644&q=80"
                alt=""
                className="object-cover h-full w-full "
              />
            </div>
          </MenuDropdown>
        </div>
      </div>
      <div className="flex mx-auto h-screen items-center justify-center ">
        <div className="w-1/2 grid place-items-center mx-auto">
          <div className="shadow-lg w-full max-w-sm rounded-lg grid place-items-center px-10 py-8">
            <h1 className="mb-8 font-medium text-2xl">Profile</h1>
            {auth.user ? (
              <form className="space-y-5 w-full" onSubmit={handleUpdate}>
                <div className="flex flex-col items-start">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full rounded-md"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col items-start">
                  <label htmlFor="password">New Password</label>
                  <input
                    type="password"
                    id="password"
                    className="w-full rounded-md"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col items-start">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="w-full rounded-md"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                <div className="!mt-8">
                  <button
                    type="submit"
                    className="btn btn-primary w-full disabled:bg-gray-300 disabled:cursor-not-allowed"
                    disabled={disabled || auth.loading}
                  >
                    {auth.loading ? 'Updating...' : 'Update Profile'}
                  </button>
                </div>
              </form>
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
