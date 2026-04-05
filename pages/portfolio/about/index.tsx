import type { NextPage } from 'next';
import React from 'react';
import PortfolioLayout from '../../../components/Portfolio/PortfolioLayout/PortfolioLayout';
import About from '../../../components/Portfolio/About/About';

const PortfolioAboutPage: NextPage = () => {
  return (
    <PortfolioLayout title={'Tahir Attar | AI-Driven Development & Web Solutions'}>
      <About />
    </PortfolioLayout>
  );
};

export default PortfolioAboutPage;
