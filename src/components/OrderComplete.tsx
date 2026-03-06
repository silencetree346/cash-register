import React from 'react';
import { Order } from '../types';

interface OrderCompleteProps {
  order: Order;
  onNewOrder: () => void;
}

export const OrderComplete: React.FC<OrderCompleteProps> = ({
  order,
  onNewOrder,
}) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-body">
          <div className="order-complete">
            <h2>✅ 支付成功!</h2>
            <div className="order-id">订单号: {order.id}</div>
            <div className="order-id">时间: {formatDate(order.timestamp)}</div>

            <div className="order-details">
              <h3>订单详情</h3>
              {order.items.map((item, index) => (
                <div key={index} className="order-item">
                  <div className="order-item-name">
                    {item.product.name} x {item.quantity}
                  </div>
                  <div className="order-item-details">
                    <div>杯型: {item.selectedCupOption.name}</div>
                    <div>温度: {item.selectedTemperature.name}</div>
                    <div>冰量: {item.selectedIce.name}</div>
                    {Object.entries(item.customizations).map(
                      ([groupId, options]) =>
                        options.length > 0 && (
                          <div key={groupId}>
                            定制: {options.map((o) => o.name).join(', ')}
                          </div>
                        )
                    )}
                    <div style={{ fontWeight: 600, marginTop: '5px' }}>
                      ${(item.totalPrice * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}

              <div className="summary-row" style={{ marginTop: '20px' }}>
                <span>小计:</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>税费 (8%):</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>总计:</span>
                <span>${order.total.toFixed(2)}</span>
              </div>

              <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '2px solid #e0e0e0' }}>
                <div className="summary-row">
                  <span>支付方式:</span>
                  <span>{order.paymentMethod === 'credit' ? '💳 信用卡' : '💵 现金'}</span>
                </div>
                {order.paymentMethod === 'cash' && (
                  <>
                    <div className="summary-row">
                      <span>收到现金:</span>
                      <span>${order.cashReceived?.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                      <span>找零:</span>
                      <span>${order.change?.toFixed(2)}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <button className="new-order-btn" onClick={onNewOrder}>
              新订单
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
