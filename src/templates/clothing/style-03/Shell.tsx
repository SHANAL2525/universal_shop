import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';
import { LoadingSkeleton } from './LoadingSkeleton';
import './style.css';

export default function Style03Shell() {
  return <div className="template-style-03">
    <Header/>
    <main><Suspense fallback={<div className="container loading-wrap"><LoadingSkeleton/></div>}><Outlet/></Suspense></main>
    <Footer/>
  </div>;
}
