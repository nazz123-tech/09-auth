'use client';
import { getMe, updateMe } from '@/lib/api/clientApi';
import Image from 'next/image';
import css from './EditProfilePage.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
export default function EditPage() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [photoUrl, setPhotoUrl] = useState(
    'https://ac.goit.global/fullstack/react/default-avatar.jpg',
  );
  const [email, setEmail] = useState('');
const setUser = useAuthStore((state) => state.setUser);
  useEffect(() => {
    getMe().then((user) => {
      setUserName(user.username ?? '');
      setPhotoUrl(
        user.avatar ??
          'https://ac.goit.global/fullstack/react/default-avatar.jpg',
      );
      setEmail(user.email ?? '');
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handelServerUser = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedUser = await updateMe({ username: userName });
    setUser(updatedUser)
    router.push('/profile');
  };
  return (
    <>
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <h1 className={css.formTitle}>Edit Profile</h1>

          <Image
            src={photoUrl}
            alt='User Avatar'
            width={120}
            height={120}
            className={css.avatar}
            loading='eager'
          />

          <form onSubmit={handelServerUser} className={css.profileInfo}>
            <div className={css.usernameWrapper}>
              <label htmlFor='username'>Username:</label>
              <input
                onChange={handleChange}
                id='username'
                value={userName}
                type='text'
                className={css.input}
              />
            </div>

            <p>Email: {email} </p>

            <div className={css.actions}>
              <button type='submit' className={css.saveButton}>
                Save
              </button>
              <button
                onClick={() => router.back()}
                type='button'
                className={css.cancelButton}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}