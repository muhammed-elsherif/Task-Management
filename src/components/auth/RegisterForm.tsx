import { useState, FormEvent } from 'react';
import axios from '../../../utils/axios';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import clockIcon from '../../../public/clock.webp';
import '../../../styles/style.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/register', { username, email, password });
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="form-container">
      <Image src={clockIcon} alt="Clock Icon" width={50} height={50} />
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link href="/login">Sign in here</Link>
      </p>
    </div>
  );
};

export default Register;
