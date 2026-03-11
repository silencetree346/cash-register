import React, { useState } from 'react';
import { Order } from '../types';

interface CashCountProps {
  orders: Order[];
}

interface CashDenomination {
  value: number;
  label: string;
  count: number;
}

interface Shift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
}

const SHIFTS: Shift[] = [
  { id: 'morning', name: '早班', startTime: '06:00', endTime: '14:00' },
  { id: 'afternoon', name: '中班', startTime: '14:00', endTime: '22:00' },
  { id: 'night', name: '晚班', startTime: '22:00', endTime: '06:00' },
  { id: 'full', name: '全天', startTime: '00:00', endTime: '23:59' },
];

export const CashCount: React.FC<CashCountProps> = ({ orders }) => {
  const [selectedShift, setSelectedShift] = useState<string>('full');
  const [denominations, setDenominations] = useState<CashDenomination[]>([
    { value: 100, label: '$100', count: 0 },
    { value: 50, label: '$50', count: 0 },
    { value: 20, label: '$20', count: 0 },
    { value: 10, label: '$10', count: 0 },
    { value: 5, label: '$5', count: 0 },
    { value: 1, label: '$1', count: 0 },
    { value: 0.25, label: '$0.25 (Quarter)', count: 0 },
    { value: 0.10, label: '$0.10 (Dime)', count: 0 },
    { value: 0.05, label: '$0.05 (Nickel)', count: 0 },
    { value: 0.01, label: '$0.01 (Penny)', count: 0 },
  ]);

  const updateCount = (index: number, count: string) => {
    const newCount = parseInt(count) || 0;
    const newDenominations = [...denominations];
    newDenominations[index].count = newCount;
    setDenominations(newDenominations);
  };

  const calculateTotalCash = () => {
    return denominations.reduce(
      (sum, denom) => sum + denom.value * denom.count,
      0
    );
  };

  const filterOrdersByShift = () => {
    const shift = SHIFTS.find((s) => s.id === selectedShift);
    if (!shift) return orders;

    return orders.filter((order) => {
      const orderTime = new Date(order.timestamp);
      const orderHour = orderTime.getHours();
      const orderMinute = orderTime.getMinutes();
      const orderTimeInMinutes = orderHour * 60 + orderMinute;

      const [startHour, startMinute] = shift.startTime.split(':').map(Number);
      const [endHour, endMinute] = shift.endTime.split(':').map(Number);
      const startTimeInMinutes = startHour * 60 + startMinute;
      const endTimeInMinutes = endHour * 60 + endMinute;

      if (shift.id === 'night') {
        return (
          orderTimeInMinutes >= startTimeInMinutes ||
          orderTimeInMinutes <= endTimeInMinutes
        );
      }

      return (
        orderTimeInMinutes >= startTimeInMinutes &&
        orderTimeInMinutes <= endTimeInMinutes
      );
    });
  };

  const calculateOrderRevenue = () => {
    const filteredOrders = filterOrdersByShift();
    const cashOrders = filteredOrders.filter(
      (order) => order.paymentMethod === 'cash'
    );
    return {
      totalRevenue: filteredOrders.reduce((sum, order) => sum + order.total, 0),
      cashRevenue: cashOrders.reduce((sum, order) => sum + order.total, 0),
      creditRevenue: filteredOrders.reduce(
        (sum, order) =>
          order.paymentMethod === 'credit' ? sum + order.total : sum,
        0
      ),
      orderCount: filteredOrders.length,
      cashOrderCount: cashOrders.length,
    };
  };

  const totalCash = calculateTotalCash();
  const revenue = calculateOrderRevenue();
  const difference = totalCash - revenue.cashRevenue;

  const resetCounts = () => {
    setDenominations(
      denominations.map((denom) => ({ ...denom, count: 0 }))
    );
  };

  return (
    <div className="cash-count-container">
      <div className="cash-count-header">
        <h2>💰 盘账</h2>
      </div>

      <div className="shift-selector">
        <h3>选择班次</h3>
        <div className="shift-buttons">
          {SHIFTS.map((shift) => (
            <button
              key={shift.id}
              className={`shift-btn ${
                selectedShift === shift.id ? 'active' : ''
              }`}
              onClick={() => setSelectedShift(shift.id)}
            >
              <div className="shift-name">{shift.name}</div>
              <div className="shift-time">
                {shift.startTime} - {shift.endTime}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="denomination-section">
        <h3>纸币和硬币盘点</h3>
        <div className="denomination-grid">
          {denominations.map((denom, index) => (
            <div key={index} className="denomination-item">
              <label className="denomination-label">{denom.label}</label>
              <div className="denomination-input-group">
                <input
                  type="number"
                  min="0"
                  value={denom.count || ''}
                  onChange={(e) => updateCount(index, e.target.value)}
                  placeholder="0"
                  className="denomination-input"
                />
                <span className="denomination-total">
                  = ${(denom.value * denom.count).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cash-summary">
        <div className="summary-card">
          <h3>盘点总额</h3>
          <div className="summary-amount cash-total">${totalCash.toFixed(2)}</div>
        </div>

        <div className="summary-card">
          <h3>订单现金收入</h3>
          <div className="summary-amount">${revenue.cashRevenue.toFixed(2)}</div>
          <div className="summary-detail">
            现金订单数: {revenue.cashOrderCount}
          </div>
        </div>

        <div className="summary-card">
          <h3>信用卡收入</h3>
          <div className="summary-amount">${revenue.creditRevenue.toFixed(2)}</div>
        </div>

        <div className="summary-card">
          <h3>总收入</h3>
          <div className="summary-amount">${revenue.totalRevenue.toFixed(2)}</div>
          <div className="summary-detail">订单总数: {revenue.orderCount}</div>
        </div>
      </div>

      <div className={`difference-card ${difference === 0 ? 'match' : 'mismatch'}`}>
        {difference === 0 ? (
          <>
            <div className="difference-icon">✅</div>
            <div className="difference-title">账目一致</div>
            <div className="difference-message">
              盘点现金与订单收入完全匹配
            </div>
          </>
        ) : (
          <>
            <div className="difference-icon">⚠️</div>
            <div className="difference-title">发现差异</div>
            <div className="difference-amount">
              {difference > 0 ? '多出' : '短缺'}: $
              {Math.abs(difference).toFixed(2)}
            </div>
            <div className="difference-message">
              {difference > 0
                ? '盘点现金大于订单收入，可能有额外现金'
                : '盘点现金小于订单收入，请核对是否有遗漏'}
            </div>
          </>
        )}
      </div>

      <div className="cash-count-actions">
        <button className="reset-btn" onClick={resetCounts}>
          重置盘点
        </button>
        <button
          className="save-btn"
          onClick={() => {
            alert('盘账记录已保存！');
          }}
        >
          保存盘账记录
        </button>
      </div>
    </div>
  );
};
