import React, { useState, useEffect } from 'react';
import { Product, Option, CartItem, CustomizationGroup } from '../types';

interface ProductOptionsProps {
  product: Product;
  onAddToCart: (item: CartItem) => void;
  onClose: () => void;
}

export const ProductOptions: React.FC<ProductOptionsProps> = ({
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
  const [customizations, setCustomizations] = useState<{
    [groupId: string]: Option[];
  }>({});

  useEffect(() => {
    setSelectedCupOption(product.defaultOptions.cupOptions[0]);
    setSelectedTemperature(product.defaultOptions.temperature[0]);
    setSelectedIce(product.defaultOptions.ice[0]);
    setCustomizations({});
  }, [product.id]);

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
    <div className="product-options-sidebar">
      <div className="sidebar-header">
        <h3>{product.name}</h3>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="sidebar-price">
        Base Price: ${product.price.toFixed(2)}
      </div>

      <div className="sidebar-body">
        <div className="sidebar-section">
          <h4>Cup Size</h4>
          <div className="sidebar-options">
            {product.defaultOptions.cupOptions.map((option) => (
              <button
                key={option.id}
                className={`sidebar-option-btn ${
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

        <div className="sidebar-section">
          <h4>Temperature</h4>
          <div className="sidebar-options">
            {product.defaultOptions.temperature.map((option) => (
              <button
                key={option.id}
                className={`sidebar-option-btn ${
                  selectedTemperature.id === option.id ? 'selected' : ''
                }`}
                onClick={() => setSelectedTemperature(option)}
              >
                {option.name}
              </button>
            ))}
          </div>
        </div>

        <div className="sidebar-section">
          <h4>Ice</h4>
          <div className="sidebar-options">
            {product.defaultOptions.ice.map((option) => (
              <button
                key={option.id}
                className={`sidebar-option-btn ${
                  selectedIce.id === option.id ? 'selected' : ''
                }`}
                onClick={() => setSelectedIce(option)}
              >
                {option.name}
              </button>
            ))}
          </div>
        </div>

        {product.customizations.map((group) => (
          <div key={group.id} className="sidebar-section">
            <h4>{group.name}</h4>
            <div className="sidebar-options">
              {group.options.map((option) => {
                const isSelected = (customizations[group.id] || []).some(
                  (o) => o.id === option.id
                );
                return (
                  <button
                    key={option.id}
                    className={`sidebar-option-btn ${isSelected ? 'selected' : ''}`}
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

      <div className="sidebar-footer">
        <div className="sidebar-total">
          Total: ${calculateTotalPrice().toFixed(2)}
        </div>

        <button className="add-to-cart-btn-sidebar" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};
