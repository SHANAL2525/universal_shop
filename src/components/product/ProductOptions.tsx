const colourValues: Record<string, string> = {
  Beige: '#d7c5a4', Black: '#161616', Blue: '#355f90', Brown: '#76533b', Burgundy: '#6f2836', Cream: '#eee8d8', Grey: '#8a8a84', Navy: '#24364f', Olive: '#62674f', Plum: '#6f425d', Red: '#a43831', White: '#f7f7f4'
};

type ProductOptionsProps = {
  label: string;
  options: string[];
  selected?: string;
  onSelect: (value: string) => void;
  error?: string;
  kind?: 'text' | 'colour';
};

export function ProductOptions({ label, options, selected, onSelect, error, kind = 'text' }: ProductOptionsProps) {
  if (!options.length) return null;
  const errorId = `${label.toLowerCase()}-error`;

  return <fieldset className={`options options--${kind}`} aria-describedby={error ? errorId : undefined} aria-invalid={Boolean(error)}>
    <legend>{label}<span>{selected && ` / ${selected}`}</span></legend>
    <div>{options.map((option) => <button type="button" key={option} aria-pressed={selected === option} onClick={() => onSelect(option)}>
      {kind === 'colour' && <span className="colour-swatch" style={{ backgroundColor: colourValues[option] ?? '#81866c' }} aria-hidden="true"/>}
      <span>{option}</span>
      {selected === option && <span className="selected-mark" aria-hidden="true">✓</span>}
    </button>)}</div>
    {error && <p className="field-error" role="alert" id={errorId}>{error}</p>}
  </fieldset>;
}
