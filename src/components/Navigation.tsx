import React from 'react';

export const Navigation: React.FC = () => {
  return (
    <div className="navigation">
      <div className="nav-header">
        <div className="nav-logo">☕</div>
        <div className="nav-store-info">
          <div className="nav-store-name">luckin coffee</div>
          <div className="nav-store-number">Store #8</div>
        </div>
      </div>
      <div className="nav-menu">
        <button className="nav-btn active">
          <span className="nav-icon">📋</span>
          <span>Order</span>
        </button>
      </div>
    </div>
  );
};
