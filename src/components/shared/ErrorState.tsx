import { ImageOff } from 'lucide-react';
export function ErrorState({ label = 'Image unavailable' }: { label?: string }) { return <span className="image-fallback" role="img" aria-label={label}><b aria-hidden="true">V</b><ImageOff aria-hidden="true"/><small>{label}</small></span>; }
