import { Minus, Plus } from 'lucide-react';

export function QuantitySelector({ value, max, disabled, onChange }: { value: number; max: number; disabled: boolean; onChange: (value: number) => void }) {
  return <div className="quantity-field">
    <span className="option-label">Quantity</span>
    <div className="quantity">
      <button type="button" aria-label="Decrease quantity" disabled={disabled || value <= 1} onClick={() => onChange(value - 1)}><Minus aria-hidden="true"/></button>
      <output aria-live="polite" aria-label={`Quantity ${value}`}>{value}</output>
      <button type="button" aria-label="Increase quantity" disabled={disabled || value >= max} onClick={() => onChange(value + 1)}><Plus aria-hidden="true"/></button>
    </div>
  </div>;
}
