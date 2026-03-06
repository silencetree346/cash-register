import React, { useState } from 'react';
import { Order, PaymentMethod, CartItem } from '../types';

interface PaymentProps {
  items: CartItem[];
  total: number;
  onComplete: (order: Order) => void;
  onClose: () => void;
}

export const Payment: React.FC<PaymentProps> = ({
  items,
  total,
  onComplete,
  onClose,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit');
  const [cashReceived, setCashReceived] = useState<string>('');

  const subtotal = items.reduce(
    (sum, item) => sum + item.totalPrice * item.quantity,
    0
  );
  const tax = subtotal * 0.08;

  const calculateChange = () => {
    const received = parseFloat(cashReceived);
    if (isNaN(received)) return 0;
    return Math.max(0, received - total);
  };

  const canCompletePayment = () => {
    if (paymentMethod === 'credit') return true;
    const received = parseFloat(cashReceived);
    return !isNaN(received) && received >= total;
  };

  const handleCompletePayment = () => {
    const order: Order = {
      id: `ORD-${Date.now()}`,
      items,
      subtotal,
      tax,
      total,
      paymentMethod,
      timestamp: new Date(),
    };

    if (paymentMethod === 'cash') {
      order.cashReceived = parseFloat(cashReceived);
      order.change = calculateChange();
    }

    onComplete(order);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>支付</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <div className="option-section">
            <h3>订单明细</h3>
            <div className="order-details">
              {items.map((item, index) => (
                <div key={index} className="order-item">
                  <div className="order-item-name">
                    {item.product.name} x {item.quantity}
                  </div>
                  <div className="order-item-details">
                    ${(item.totalPrice * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
              <div className="summary-row" style={{ marginTop: '15px' }}>
                <span>小计:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>税费 (8%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>总计:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="option-section">
            <h3>支付方式</h3>
            <div className="payment-methods">
              <button
                className={`payment-method-btn ${
                  paymentMethod === 'credit' ? 'selected' : ''
                }`}
                onClick={() => setPaymentMethod('credit')}
              >
                💳 信用卡
              </button>
              <button
                className={`payment-method-btn ${
                  paymentMethod === 'cash' ? 'selected' : ''
                }`}
                onClick={() => setPaymentMethod('cash')}
              >
                💵 现金
              </button>
            </div>
          </div>

          {paymentMethod === 'cash' && (
            <div className="cash-input-section">
              <label htmlFor="cash-received">收到现金:</label>
              <input
                id="cash-received"
                type="number"
                step="0.01"
                min="0"
                value={cashReceived}
                onChange={(e) => setCashReceived(e.target.value)}
                placeholder="请输入收到的金额"
              />
              {cashReceived && parseFloat(cashReceived) >= total && (
                <div className="change-display">
                  <p>找零:</p>
                  <p className="change-amount">${calculateChange().toFixed(2)}</p>
                </div>
              )}
              {cashReceived && parseFloat(cashReceived) < total && (
                <div style={{ color: '#d32f2f', marginTop: '10px', fontWeight: 600 }}>
                  金额不足，还需 ${(total - parseFloat(cashReceived)).toFixed(2)}
                </div>
              )}
            </div>
          )}

          <button
            className="complete-payment-btn"
            onClick={handleCompletePayment}
            disabled={!canCompletePayment()}
          >
            完成支付
          </button>
        </div>
      </div>
    </div>
  );
};
