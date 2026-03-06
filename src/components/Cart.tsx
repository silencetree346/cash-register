import React from 'react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onRemoveItem: (index: number) => void;
  onUpdateQuantity: (index: number, quantity: number) => void;
  onCheckout: () => void;
}

export const Cart: React.FC<CartProps> = ({
  items,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout,
}) => {
  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const formatCustomizations = (item: CartItem) => {
    const parts: string[] = [];
    
    Object.entries(item.customizations).forEach(([, options]) => {
      if (options.length > 0) {
        const optionNames = options.map((o) => o.name).join(', ');
        parts.push(optionNames);
      }
    });
    
    return parts.join(' | ');
  };

  return (
    <div className="sidebar">
      <div className="cart">
        <div className="cart-header">购物车</div>
        {items.length === 0 ? (
          <div className="cart-empty">购物车是空的</div>
        ) : (
          <div>
            {items.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="cart-item-header">
                  <h4>{item.product.name}</h4>
                  <button
                    className="cart-item-remove"
                    onClick={() => onRemoveItem(index)}
                  >
                    删除
                  </button>
                </div>
                <div className="cart-item-options">
                  <div>杯型: {item.selectedCupOption.name}</div>
                  <div>温度: {item.selectedTemperature.name}</div>
                  <div>冰量: {item.selectedIce.name}</div>
                  {formatCustomizations(item) && (
                    <div>定制: {formatCustomizations(item)}</div>
                  )}
                </div>
                <div className="cart-item-footer">
                  <div className="cart-item-quantity">
                    <button
                      className="quantity-btn"
                      onClick={() =>
                        onUpdateQuantity(index, Math.max(1, item.quantity - 1))
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-price">
                    ${(item.totalPrice * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {items.length > 0 && (
        <div className="cart-summary">
          <div className="summary-row">
            <span>小计:</span>
            <span>${calculateSubtotal().toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>税费 (8%):</span>
            <span>${calculateTax().toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>总计:</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
          <button className="checkout-btn" onClick={onCheckout}>
            结账
          </button>
        </div>
      )}
    </div>
  );
};
