import React, { useState } from 'react';

interface LeftPanelProps {
  storeName: string;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({ storeName }) => {
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [codeInputType, setCodeInputType] = useState<'pickup' | 'finish'>('pickup');
  const [code, setCode] = useState('');
  const [showClockOptions, setShowClockOptions] = useState(false);

  const handleOpenCodeInput = (type: 'pickup' | 'finish') => {
    setCodeInputType(type);
    setCode('');
    setShowCodeInput(true);
  };

  const handleSubmitCode = () => {
    if (code.trim()) {
      if (codeInputType === 'pickup') {
        alert(`取单成功！订单编码: ${code}`);
      } else {
        alert(`订单完成！订单编码: ${code}`);
      }
      setShowCodeInput(false);
      setCode('');
    }
  };

  const handleNumberClick = (num: string) => {
    setCode(code + num);
  };

  const handleClear = () => {
    setCode('');
  };

  const handleBackspace = () => {
    setCode(code.slice(0, -1));
  };

  const handleClockAction = (action: string) => {
    alert(`${action} 成功！时间: ${new Date().toLocaleString('zh-CN')}`);
    setShowClockOptions(false);
  };

  return (
    <>
      <div className="left-panel">
        <div className="store-name">{storeName}</div>
        <div className="code-actions">
          <button
            className="code-action-btn"
            onClick={() => handleOpenCodeInput('pickup')}
          >
            Pick up by code
          </button>
          <button
            className="code-action-btn"
            onClick={() => handleOpenCodeInput('finish')}
          >
            Finish by code
          </button>
        </div>
        <button className="clock-in-btn" onClick={() => setShowClockOptions(true)}>
          🕐
        </button>
      </div>

      {showCodeInput && (
        <div className="modal-overlay" onClick={() => setShowCodeInput(false)}>
          <div className="modal code-input-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{codeInputType === 'pickup' ? 'Pick up by code' : 'Finish by code'}</h2>
              <button className="modal-close" onClick={() => setShowCodeInput(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="code-display">{code || '请输入订单编码'}</div>
              
              <div className="number-pad">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    className="number-btn"
                    onClick={() => handleNumberClick(num.toString())}
                  >
                    {num}
                  </button>
                ))}
                <button className="number-btn clear-btn" onClick={handleClear}>
                  C
                </button>
                <button className="number-btn" onClick={() => handleNumberClick('0')}>
                  0
                </button>
                <button className="number-btn backspace-btn" onClick={handleBackspace}>
                  ⌫
                </button>
              </div>

              <button
                className="submit-code-btn"
                onClick={handleSubmitCode}
                disabled={!code.trim()}
              >
                {codeInputType === 'pickup' ? 'Pick up' : 'Finish'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showClockOptions && (
        <div className="modal-overlay" onClick={() => setShowClockOptions(false)}>
          <div className="modal clock-options-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>打卡选项</h2>
              <button className="modal-close" onClick={() => setShowClockOptions(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="clock-options">
                <button
                  className="clock-option-btn clock-in"
                  onClick={() => handleClockAction('Clock In')}
                >
                  Clock In
                </button>
                <button
                  className="clock-option-btn clock-out"
                  onClick={() => handleClockAction('Clock Out')}
                >
                  Clock Out
                </button>
                <button
                  className="clock-option-btn break-start"
                  onClick={() => handleClockAction('Break Start')}
                >
                  Break Start
                </button>
                <button
                  className="clock-option-btn break-end"
                  onClick={() => handleClockAction('Break End')}
                >
                  Break End
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
