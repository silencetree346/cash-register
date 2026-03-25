import { useState, useEffect } from 'react';
import { products, categories } from './data/products';
import { Product, CartItem, Order } from './types';
import { ProductOptions } from './components/ProductOptions';
import { Cart } from './components/Cart';
import { Payment } from './components/Payment';
import { OrderComplete } from './components/OrderComplete';
import { Navigation } from './components/Navigation';
import { LeftPanel } from './components/LeftPanel';
import './styles.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem('orderHistory');
    if (savedOrders) {
      setOrderHistory(JSON.parse(savedOrders));
    }
  }, []);

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter((p) => p.category === selectedCategory);

  const handleAddToCart = (item: CartItem) => {
    const existingIndex = cartItems.findIndex(
      (cartItem) =>
        cartItem.product.id === item.product.id &&
        cartItem.selectedCupOption.id === item.selectedCupOption.id &&
        cartItem.selectedTemperature.id === item.selectedTemperature.id &&
        cartItem.selectedIce.id === item.selectedIce.id &&
        JSON.stringify(cartItem.customizations) === JSON.stringify(item.customizations)
    );

    if (existingIndex !== -1) {
      const newCartItems = [...cartItems];
      newCartItems[existingIndex].quantity += 1;
      setCartItems(newCartItems);
    } else {
      setCartItems([...cartItems, item]);
    }
  };

  const handleRemoveItem = (index: number) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity = quantity;
    setCartItems(newCartItems);
  };

  const handleCheckout = () => {
    setShowPayment(true);
  };

  const handlePaymentComplete = (order: Order) => {
    const newOrderHistory = [...orderHistory, order];
    setOrderHistory(newOrderHistory);
    localStorage.setItem('orderHistory', JSON.stringify(newOrderHistory));
    setCompletedOrder(order);
    setShowPayment(false);
  };

  const handleNewOrder = () => {
    setCompletedOrder(null);
    setCartItems([]);
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.totalPrice * item.quantity,
      0
    );
    const tax = subtotal * 0.08;
    return subtotal + tax;
  };

  return (
    <div className="app">
      <LeftPanel storeName="Store88" />
      <Navigation />

      <ProductOptions
        product={selectedProduct}
        onAddToCart={handleAddToCart}
        onClearProduct={() => setSelectedProduct(null)}
      />

      <div className="main-content">
        <div className="header">
          <h1>📋 Menu</h1>
          <div className="header-actions">
            <span className="header-time">{new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>

        <div className="content-wrapper">
          <div className="categories">
            <button
              className={`category-btn ${
                selectedCategory === 'All' ? 'active' : ''
              }`}
              onClick={() => setSelectedCategory('All')}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`category-btn ${
                  selectedCategory === category ? 'active' : ''
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="products">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => setSelectedProduct(product)}
              >
                <h3>{product.name}</h3>
                <p className="price">${product.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Cart
        items={cartItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
      />

      {showPayment && (
        <Payment
          items={cartItems}
          total={calculateTotal()}
          onComplete={handlePaymentComplete}
          onClose={() => setShowPayment(false)}
        />
      )}

      {completedOrder && (
        <OrderComplete order={completedOrder} onNewOrder={handleNewOrder} />
      )}
    </div>
  );
}

export default App;
