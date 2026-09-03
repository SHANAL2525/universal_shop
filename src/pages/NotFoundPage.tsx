import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function NotFoundPage() { return <main className="global-not-found"><span>404</span><p>Page not found</p><h1>This preview is unavailable.</h1><Link to="/"><ArrowLeft aria-hidden="true"/> Return to template selector</Link></main>; }
