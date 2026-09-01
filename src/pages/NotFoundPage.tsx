import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function NotFoundPage() { return <section className="container not-found"><span className="not-found__number">404</span><span className="kicker">Wrong turn, lovely</span><h1>This page isn’t in our collection.</h1><p>Let’s get you back to the pieces you came to see.</p><Link className="button button--dark" to="/"><ArrowLeft/> Return to catalogue</Link></section>; }
