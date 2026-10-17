import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeItem } from '../slices/cartSlice';

const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalSum = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (items.length === 0) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Ваша корзина пуста</h1>
        <p className="text-gray-500">Добавьте товары в корзину, чтобы продолжить</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Моя корзина</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr className="text-gray-600 text-sm uppercase tracking-wider">
              <th className="p-4 font-semibold">Товар</th>
              <th className="p-4 text-center font-semibold">Кол-во</th>
              <th className="p-4 text-right font-semibold">Цена</th>
              <th className="p-4 text-center font-semibold">Действие</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-t hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium text-gray-800">{item.name}</td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => dispatch(updateQuantity({ id: item.id, delta: -1 }))}
                      className="bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                      −
                    </button>
                    <span className="font-bold w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(updateQuantity({ id: item.id, delta: 1 }))}
                      className="bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="p-4 text-right font-semibold text-gray-700">${item.price * item.quantity}</td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => dispatch(removeItem(item.id))}
                    className="text-red-500 hover:text-red-700 font-medium transition-colors"
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-6 bg-gray-50 text-right flex justify-end items-center gap-4">
          <span className="text-xl font-semibold text-gray-600">Итоговая сумма:</span>
          <span className="text-3xl font-black text-blue-600">${totalSum}</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
