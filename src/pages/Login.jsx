import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    try {
      dispatch(login({ username, password }));
      navigate('/');
    } catch (err) {
      setError(err.message || 'Ошибка при входе');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-gray-900 mb-2">С возвращением!</h2>
          <p className="text-gray-500">Войдите в свой аккаунт</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-6 text-center font-medium border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Логин</label>
            <input
              type="text"
              className="border border-gray-200 p-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-gray-50 focus:bg-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Пароль</label>
            <input
              type="password"
              className="border border-gray-200 p-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-gray-50 focus:bg-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white p-4 rounded-2xl text-sm font-bold hover:bg-gray-800 transition-all active:scale-95 shadow-lg mt-4"
          >
            Войти
          </button>
        </form>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Нет аккаунта? <Link to="/register" className="text-blue-600 font-bold hover:underline">Зарегистрироваться</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
