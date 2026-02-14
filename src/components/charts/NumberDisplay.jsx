import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function NumberDisplay({ value = 16, title = "مسح الفواصل الصخرية", icon = null, theme = "dark" }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    // إذا كانت القيمة صفر، لا تعمل animation
    if (value === 0) {
      setDisplayValue(0);
      return;
    }

    // حساب مدة الـ animation بناءً على قيمة الرقم
    const duration = Math.min(2000, value * 10); // أقصى 2 ثانية
    const steps = Math.min(value, 100); // حد أقصى 100 خطوة
    const increment = value / steps;
    const stepDuration = duration / steps;

    let current = 0;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), value);
      setDisplayValue(current);

      if (current >= value) {
        clearInterval(interval);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [value]);

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderRadius: '8px',
        padding: '12px 8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        minHeight: '100px',
        gap: '8px'
      }}
    >
      {icon && (
        <div style={{ fontSize: '24px', color: 'rgba(212, 175, 55, 0.8)' }}>
          <FontAwesomeIcon icon={icon} />
        </div>
      )}
      <h3
        style={{
          color: 'var(--text-primary)',
          fontSize: 'clamp(12px, 1.2vw, 14px)',
          fontWeight: '600',
          textAlign: 'center',
          direction: 'rtl',
          margin: 0,
          lineHeight: '1.3'
        }}
      >
        {title}
      </h3>
      <div
        style={{
          fontSize: 'clamp(32px, 5vw, 48px)',
          fontWeight: 'bold',
          color: 'rgba(212, 175, 55, 0.8)',
          textShadow: theme === 'dark' 
            ? '0 0 15px rgba(212, 175, 55, 0.6), 0 0 30px rgba(212, 175, 55, 0.4)' 
            : '0 0 12px rgba(212, 175, 55, 0.5), 0 0 20px rgba(212, 175, 55, 0.3)',
          fontFamily: 'monospace',
          letterSpacing: '2px'
        }}
      >
        {displayValue}
      </div>
    </div>
  );
}

export default NumberDisplay;
