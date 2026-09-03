export function ProductOptions({ label, options, selected, onSelect, error }: { label: string; options: string[]; selected?: string; onSelect: (value: string) => void; error?: string }) {
  if (!options.length) return null;
  const errorId = `style-01-${label.toLowerCase()}-error`;
  return <fieldset className="options" aria-describedby={error ? errorId : undefined} aria-invalid={Boolean(error)}><legend>{label} <span>{selected && `— ${selected}`}</span></legend><div>{options.map((option) => <button type="button" key={option} aria-pressed={selected === option} onClick={() => onSelect(option)}>{selected === option && <span aria-hidden="true">✓ </span>}{option}</button>)}</div>{error && <p className="field-error" role="alert" id={errorId}>{error}</p>}</fieldset>;
}
