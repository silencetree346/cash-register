import React from 'react';

interface NavigationProps {
  currentView: 'order' | 'cashcount';
  onViewChange: (view: 'order' | 'cashcount') => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentView,
  onViewChange,
}) => {
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
        <button
          className={`nav-btn ${currentView === 'order' ? 'active' : ''}`}
          onClick={() => onViewChange('order')}
        >
          <span className="nav-icon">📋</span>
          <span>Order</span>
        </button>
        <button
          className={`nav-btn ${currentView === 'cashcount' ? 'active' : ''}`}
          onClick={() => onViewChange('cashcount')}
        >
          <span className="nav-icon">💰</span>
          <span>Cash Count</span>
        </button>
      </div>
    </div>
  );
};
