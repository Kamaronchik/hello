import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../slices/authSlice';
import { clearCart as clearCartAction } from '../slices/cartSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const items = useSelector((state) => state.cart.items);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCartAction());
  };

  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
      <Link to="/" className="text-2xl font-black text-gray-900 tracking-tighter flex items-center gap-2">
        <span className="bg-black text-white px-2 py-0.5 rounded">On</span> Докон
      </Link>

      <div className="flex items-center gap-8">
        <Link to="/cart" className="relative group transition-all">
          <div className="flex items-center gap-2 text-gray-600 group-hover:text-black transition-colors">
            <span className="text-xl">🛒</span>
            <span className="hidden sm:inline font-medium text-sm">Корзина</span>
          </div>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-4 bg-blue-600 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold ring-2 ring-white">
              {totalItems}
            </span>
          )}
        </Link>

        {!isLoggedIn ? (
          <Link to="/login" className="bg-black text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition-all active:scale-95 shadow-md">
            Войти
          </Link>
        ) : (
          <div className="flex items-center gap-5">
            <div className="flex flex-col items-end leading-tight">
              <span className="text-xs text-gray-400 font-medium">Пользователь</span>
              <span className="text-sm font-bold text-gray-800">{user?.username}</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors uppercase tracking-widest"
            >
              Выйти
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
