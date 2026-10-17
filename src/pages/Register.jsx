import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      dispatch(register({ username: formData.username, password: formData.password }));
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center eco-bg px-4">
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl border border-green-100 w-full max-w-sm shadow-2xl">
        <div className="text-center mb-6">
          <span className="text-4xl mb-2 block">🌿</span>
          <h2 className="text-2xl font-bold text-green-900">Регистрация</h2>
        </div>

        {error && <div className="bg-red-100 text-red-700 p-2 rounded-lg text-sm mb-4 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-green-700 ml-1">Логин</label>
            <input
              type="text"
              className="border border-green-200 p-2 rounded-xl text-sm outline-none focus:ring-2 focus:ring-green-500 bg-white/50"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-green-700 ml-1">Пароль</label>
            <input
              type="password"
              className="border border-green-200 p-2 rounded-xl text-sm outline-none focus:ring-2 focus:ring-green-500 bg-white/50"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-green-700 ml-1">Повторите пароль</label>
            <input
              type="password"
              className="border border-green-200 p-2 rounded-xl text-sm outline-none focus:ring-2 focus:ring-green-500 bg-white/50"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-700 text-white p-3 rounded-xl text-sm font-bold hover:bg-green-800 transition-all shadow-lg mt-2"
          >
            Создать аккаунт
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-6">
          Уже есть аккаунт? <Link to="/login" className="text-green-600 font-bold hover:underline">Войти</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
