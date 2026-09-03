import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function NotFoundPage() { return <section className="container not-found"><span className="not-found__number">404</span><span className="kicker">Page not found</span><h1>This page is unavailable.</h1><p>Return to the catalogue to keep browsing the current drop.</p><Link className="button button--dark" to="/"><ArrowLeft aria-hidden="true"/> Return to catalogue</Link></section>; }
