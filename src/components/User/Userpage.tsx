'use client'
import { UserProfile } from '@/types/Util';
import Input from '../ui/Input';
import { Button } from '../ui/Button';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { updateUserProfile, resetUpdateSuccess } from '@/redux/features/authSlice';
import { toast } from 'react-hot-toast';

interface FormData {
  username: string;
  nickname: string;
  email: string;
  password: string;
  about: string;
}

const UserView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error, updateSuccess } = useSelector((state: RootState) => state.auth);
  const [isEditEnable, setEditEnable] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const userId = user?.id || '';
  const [formData, setFormData] = useState<FormData>({
    username: '',
    nickname: '',
    email: '',
    password: '',
    about: '',
  });

  useEffect(() => {
    if (!user && typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setFormData({
          username: String(userData.username || ''),
          nickname: String(userData.nickname || ''),
          email: String(userData.email || ''),
          password: '',
          about: String(userData.about || ''),
        });
      }
    } else if (user) {
      setFormData({
        username: String(user.username || ''),
        nickname: String(user.nickname || ''),
        email: String(user.email || ''),
        password: '',
        about: String(user.about || ''),
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleImageClick = () => {
    if (isEditEnable && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updateData: any = {};
    if (formData.username) updateData.username = formData.username;
    if (formData.nickname) updateData.nickname = formData.nickname;
    if (formData.email) updateData.email = formData.email;
    if (formData.password) updateData.password = formData.password;
    if (formData.about) updateData.about = formData.about;

    if (selectedFile) {
      updateData.profilePhoto = selectedFile;

    }

    if (userId) {
      dispatch(updateUserProfile({ userId, userData: updateData }));
    } else {
      toast.error("User ID not found. Please log in again.");
    }
  };

  useEffect(() => {
    if (updateSuccess) {
      toast.success('Profile updated successfully!');
      setEditEnable(false);
      setSelectedFile(null);
      setPreviewUrl(null);
      dispatch(resetUpdateSuccess());
    }

    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [updateSuccess, error, dispatch]);


  return (
    <div className='min-h-screen w-full bg-background'>
      <div className='mx-auto min-h-screen pt-[100px] w-full px-4 sm:px-10'>
        <div className='bg-card border border-theme p-4 sm:p-8 rounded-3xl h-fit mx-auto max-w-[1200px] shadow-md'>
          <form onSubmit={handleSubmit}>
            <div className='w-full flex flex-col md:flex-row gap-8'>
              <div className='flex flex-col items-center'>
                <div
                  className={`relative ${isEditEnable ? 'cursor-pointer' : ''}`}
                  onClick={handleImageClick}
                >
                  <img
                    src={previewUrl || user?.profilePhotoUrl?.toString() || '/images/logo_whitebg.png'}
                    className='bg-primary w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] object-cover rounded-full border-4 border-accent'
                    alt="Profile photo"
                  />
                  {isEditEnable && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                      <span className="text-white font-medium text-xs sm:text-sm">Change Photo</span>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                <h2 className='text-lg sm:text-2xl font-bold mt-4'>{formData.username || 'Username'}</h2>
                <p className='text-subtext'>@{formData.nickname || 'Nickname'}</p>
                {selectedFile && (
                  <p className='text-xs text-primary mt-2'>New photo selected: {selectedFile.name}</p>
                )}
              </div>

              <div className='flex-1 flex flex-col'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
                  <Input
                    disabled={!isEditEnable}
                    value={formData.username}
                    onChange={handleChange}
                    id="username"
                    label='Username:'
                    placeholder='Enter your desired username'
                  />
                  <Input
                    disabled={!isEditEnable}
                    value={formData.nickname}
                    onChange={handleChange}
                    id="nickname"
                    label='Nickname:'
                    placeholder='Enter your nickname'
                  />
                  <Input
                    disabled={!isEditEnable}
                    value={formData.email}
                    onChange={handleChange}
                    id="email"
                    label='Email:'
                    placeholder='Email Address'
                  />
                  
                  {isEditEnable ? (
                    <Input
                      value={formData.password}
                      onChange={handleChange}
                      id="password"
                      label='Password:'
                      type='password'
                      placeholder='••••••••'
                    />
                  ) : (
                    <div className='flex flex-col'>
                      <p className='text-[.9rem] mt-1'>Password:</p>
                      <div className='bg-white dark:bg-sidebar border border-theme p-3 rounded-lg h-[41px] flex items-center text-subtext'>
                        ••••••••
                      </div>
                    </div>
                  )}
                </div>

                <label className='w-full mt-4 sm:mt-6' htmlFor="about">
                  <p className='text-[.9rem] mt-1'>About:</p>
                  <textarea
                    disabled={!isEditEnable}
                    placeholder='Say something about yourself...'
                    value={formData.about}
                    onChange={handleChange}
                    className='h-[100px] w-full bg-white dark:bg-sidebar border border-theme p-3 placeholder:text-[.9rem] placeholder:text-subtext outline-none rounded-lg resize-none'
                    id="about"
                  />
                </label>

                <div className='flex justify-end gap-3 mt-4 sm:mt-6'>
                  {isEditEnable && (
                    <>
                      <Button
                        type='submit'
                        disabled={loading}
                        className={`flex items-center justify-center w-[100px] text-center mt-1 bg-primary text-white hover:bg-secondary p-2 text-[1rem] rounded-lg ${loading ? 'opacity-70' : ''}`}
                      >
                        {loading ? 'Updating...' : 'Update'}
                      </Button>
                      <Button
                        type='button'
                        onClick={() => {
                          setEditEnable(false);
                          setSelectedFile(null);
                          setPreviewUrl(null);
                        }}
                        className='flex items-center justify-center w-[100px] text-center mt-1 bg-danger text-white hover:opacity-90 p-2 text-[1rem] rounded-lg'
                      >
                        Cancel
                      </Button>
                    </>
                  )}

                  {!isEditEnable && (
                    <Button
                      type='button'
                      onClick={() => setEditEnable(true)}
                      className='flex items-center justify-center w-[100px] text-center mt-1 bg-primary text-white hover:bg-secondary p-2 text-[1rem] rounded-lg'
                    >
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserView;