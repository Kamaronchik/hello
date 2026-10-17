import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const PRODUCTS = [
  { id: 1, name: 'iPhone 15 Pro', price: 1200, category: 'Смартфоны', img: '📱' },
  { id: 2, name: 'MacBook Air M2', price: 1000, category: 'Ноутбуки', img: '💻' },
  { id: 3, name: 'AirPods Pro 2', price: 250, category: 'Аксессуары', img: '🎧' },
  { id: 4, name: 'Apple Watch S9', price: 400, category: 'Часы', img: '⌚' },
  { id: 5, name: 'iPad Pro M2', price: 800, category: 'Планшеты', img: '平板' },
  { id: 6, name: 'Magic Mouse', price: 80, category: 'Аксессуары', img: '🖱️' },
  { id: 7, name: 'AirTag 4-pack', price: 100, category: 'Аксессуары', img: '🏷️' },
  { id: 8, name: 'Studio Display', price: 1600, category: 'Мониторы', img: '🖥️' },
];

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      dispatch(addToCart(product));
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Каталог</h1>
          <p className="text-gray-500 text-lg">Лучшие гаджеты с доставкой</p>
        </div>
        <div className="text-sm font-medium text-gray-400">
          Всего товаров: {PRODUCTS.length}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {PRODUCTS.map(product => (
          <div
            key={product.id}
            className="group bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col relative overflow-hidden"
          >
            {/* Accent background on hover */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-full -mr-8 -mt-8 transition-all group-hover:bg-blue-50 group-hover:scale-150 duration-500" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="h-40 flex items-center justify-center text-6xl mb-6 bg-gray-50 rounded-2xl group-hover:bg-white transition-colors shadow-inner">
                {product.img}
              </div>

              <div className="mb-auto">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1 block">
                  {product.category}
                </span>
                <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-2xl font-black text-gray-900">${product.price}</span>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-gray-900 text-white p-3 rounded-2xl hover:bg-blue-600 transition-all active:scale-90 shadow-lg"
                  title="Добавить в корзину"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
