import React, { useState, useEffect } from 'react';
import { Product, Option, CartItem, CustomizationGroup } from '../types';
import {
  cupOptions,
  temperatureOptions,
  iceOptions,
  modalSyrupGroup,
  modalCreamGroup,
  modalPowdersGroup,
  modalEspressoSubGroups,
  getCustomizeModalProductExtras,
} from '../data/products';

interface ProductOptionsProps {
  product: Product | null;
  onAddToCart: (item: CartItem) => void;
  onClearProduct: () => void;
}

export const ProductOptions: React.FC<ProductOptionsProps> = ({
  product,
  onAddToCart,
  onClearProduct,
}) => {
  const [selectedCupOption, setSelectedCupOption] = useState<Option>(
    cupOptions[0]
  );
  const [selectedTemperature, setSelectedTemperature] = useState<Option>(
    temperatureOptions[0]
  );
  const [selectedIce, setSelectedIce] = useState<Option>(iceOptions[0]);
  const [customizations, setCustomizations] = useState<{
    [groupId: string]: Option[];
  }>({});
  const [showCustomization, setShowCustomization] = useState(false);

  useEffect(() => {
    setCustomizations({});
    setShowCustomization(false);
  }, [product?.id]);

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
    if (!product) return 0;
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
    if (!product) return;
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
    onClearProduct();
  };

  const renderModalGroup = (group: CustomizationGroup) => (
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
              type="button"
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
  );

  return (
    <div className="product-options-sidebar">
      <div className="sidebar-header">
        <h3>{product ? product.name : 'Remarks'}</h3>
        {product && (
          <button className="close-btn" onClick={onClearProduct}>×</button>
        )}
      </div>

      {product && (
        <div className="sidebar-price">
          Base Price: ${product.price.toFixed(2)}
        </div>
      )}

      <div className="sidebar-body">
        <div className="sidebar-section">
          <h4>Cup Size</h4>
          <div className="sidebar-options">
            {cupOptions.map((option) => (
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
            {temperatureOptions.map((option) => (
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
            {iceOptions.map((option) => (
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

        {product && (
          <div className="sidebar-section sidebar-customize-wrap">
            <button
              type="button"
              className="sidebar-customize-btn"
              onClick={() => setShowCustomization(true)}
            >
              Customize
            </button>
          </div>
        )}
      </div>

      {product && (
        <div className="sidebar-footer">
          <div className="sidebar-total">
            Total: ${calculateTotalPrice().toFixed(2)}
          </div>

          <button className="add-to-cart-btn-sidebar" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      )}

      {showCustomization && product && (
        <div className="modal-overlay" onClick={() => setShowCustomization(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Customization</h2>
              <button
                type="button"
                className="modal-close"
                onClick={() => setShowCustomization(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              {[modalSyrupGroup, modalCreamGroup, modalPowdersGroup].map((group) =>
                renderModalGroup(group)
              )}
              <div className="option-section espresso-options-block">
                <h3>Espresso Options</h3>
                {modalEspressoSubGroups.map((group) => (
                  <div key={group.id} className="espresso-subsection">
                    <h4 className="espresso-subtitle">{group.name}</h4>
                    <div className="option-group">
                      {group.options.map((option) => {
                        const isSelected = (customizations[group.id] || []).some(
                          (o) => o.id === option.id
                        );
                        return (
                          <button
                            key={option.id}
                            type="button"
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
              {getCustomizeModalProductExtras(product).map((group) =>
                renderModalGroup(group)
              )}
              <button
                type="button"
                className="customization-toggle"
                onClick={() => setShowCustomization(false)}
              >
                确认
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
