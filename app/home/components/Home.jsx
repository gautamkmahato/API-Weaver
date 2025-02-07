import React from 'react'
import HeroSection from './HeroSection';
import Features from './Features';
import Guides from './Guides';
import Pricing from './Pricing';
import Support from './Support';

export default function Home() {
    return (
        <>
            <HeroSection />
            <Features />
            <Guides />
            <Pricing />
            <Support />
        </>
    );
}
