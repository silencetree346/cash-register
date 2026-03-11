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
      <button
        className={`nav-btn ${currentView === 'order' ? 'active' : ''}`}
        onClick={() => onViewChange('order')}
      >
        <span className="nav-icon">🛒</span>
        <span>点单</span>
      </button>
      <button
        className={`nav-btn ${currentView === 'cashcount' ? 'active' : ''}`}
        onClick={() => onViewChange('cashcount')}
      >
        <span className="nav-icon">💰</span>
        <span>盘账</span>
      </button>
    </div>
  );
};
