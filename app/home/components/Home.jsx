import React from 'react'
import HeroSection from './HeroSection';
import Features from './Features';
import Guides from './Guides';
import Pricing from './Pricing';
import Support from './Support';
import Footer from './Footer';
import Header from './Header';

export default function Home() {
    return (
        <>
            <Header />
            <HeroSection />
            <Features />
            <Guides />
            <Pricing />
            <Support />
            <Footer />
        </>
    );
}
