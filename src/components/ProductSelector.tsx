import React, { useState } from 'react';
import { Product, Option, CartItem, CustomizationGroup } from '../types';

interface ProductSelectorProps {
  product: Product;
  onAddToCart: (item: CartItem) => void;
  onClose: () => void;
}

export const ProductSelector: React.FC<ProductSelectorProps> = ({
  product,
  onAddToCart,
  onClose,
}) => {
  const [selectedCupOption, setSelectedCupOption] = useState<Option>(
    product.defaultOptions.cupOptions[0]
  );
  const [selectedTemperature, setSelectedTemperature] = useState<Option>(
    product.defaultOptions.temperature[0]
  );
  const [selectedIce, setSelectedIce] = useState<Option>(
    product.defaultOptions.ice[0]
  );
  const [showCustomization, setShowCustomization] = useState(false);
  const [customizations, setCustomizations] = useState<{
    [groupId: string]: Option[];
  }>({});

  const toggleCustomizationOption = (group: CustomizationGroup, option: Option) => {
    const groupId = group.id;
    const currentSelections = customizations[groupId] || [];

    if (group.multiSelect) {
      const isSelected = currentSelections.some((o) => o.id === option.id);
      if (isSelected) {
        setCustomizations({
          ...customizations,
          [groupId]: currentSelections.filter((o) => o.id !== option.id),
        });
      } else {
        setCustomizations({
          ...customizations,
          [groupId]: [...currentSelections, option],
        });
      }
    } else {
      setCustomizations({
        ...customizations,
        [groupId]: [option],
      });
    }
  };

  const calculateTotalPrice = () => {
    let total = product.price;
    total += selectedCupOption.price || 0;
    total += selectedTemperature.price || 0;
    total += selectedIce.price || 0;

    Object.values(customizations).forEach((options) => {
      options.forEach((option) => {
        total += option.price || 0;
      });
    });

    return total;
  };

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      product,
      selectedCupOption,
      selectedTemperature,
      selectedIce,
      customizations,
      quantity: 1,
      totalPrice: calculateTotalPrice(),
    };
    onAddToCart(cartItem);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{product.name}</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <div className="option-section">
            <h3>Cup Options</h3>
            <div className="option-group">
              {product.defaultOptions.cupOptions.map((option) => (
                <button
                  key={option.id}
                  className={`option-btn ${
                    selectedCupOption.id === option.id ? 'selected' : ''
                  }`}
                  onClick={() => setSelectedCupOption(option)}
                >
                  {option.name}
                  {option.price ? ` (+$${option.price.toFixed(2)})` : ''}
                </button>
              ))}
            </div>
          </div>

          <div className="option-section">
            <h3>Temperature</h3>
            <div className="option-group">
              {product.defaultOptions.temperature.map((option) => (
                <button
                  key={option.id}
                  className={`option-btn ${
                    selectedTemperature.id === option.id ? 'selected' : ''
                  }`}
                  onClick={() => setSelectedTemperature(option)}
                >
                  {option.name}
                </button>
              ))}
            </div>
          </div>

          <div className="option-section">
            <h3>Ice</h3>
            <div className="option-group">
              {product.defaultOptions.ice.map((option) => (
                <button
                  key={option.id}
                  className={`option-btn ${
                    selectedIce.id === option.id ? 'selected' : ''
                  }`}
                  onClick={() => setSelectedIce(option)}
                >
                  {option.name}
                </button>
              ))}
            </div>
          </div>

          <button
            className="customization-toggle"
            onClick={() => setShowCustomization(!showCustomization)}
          >
            {showCustomization ? '隐藏定制选项' : '显示定制选项 (Customization)'}
          </button>

          {showCustomization && (
            <div>
              {product.customizations.map((group) => (
                <div key={group.id} className="option-section">
                  <h3>{group.name}</h3>
                  <div className="option-group">
                    {group.options.map((option) => {
                      const isSelected = (customizations[group.id] || []).some(
                        (o) => o.id === option.id
                      );
                      return (
                        <button
                          key={option.id}
                          className={`option-btn ${isSelected ? 'selected' : ''}`}
                          onClick={() => toggleCustomizationOption(group, option)}
                        >
                          {option.name}
                          {option.price ? ` (+$${option.price.toFixed(2)})` : ''}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="option-section">
            <div className="summary-row total">
              <span>总价:</span>
              <span>${calculateTotalPrice().toFixed(2)}</span>
            </div>
          </div>

          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            加入购物车
          </button>
        </div>
      </div>
    </div>
  );
};
