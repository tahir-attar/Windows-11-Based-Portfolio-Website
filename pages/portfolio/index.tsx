import type { NextPage } from 'next';
import React from 'react';

import PortfolioLayout from '../../components/Portfolio/PortfolioLayout/PortfolioLayout';
import PortfolioLanding from '../../components/Portfolio/PortfolioLanding/PortfolioLanding';

const PortfolioLandingPage: NextPage = () => {
  return (
    <PortfolioLayout title={'Tahir Attar | AI-Driven Development & Web Solutions'}>
      <PortfolioLanding />
    </PortfolioLayout>
  );
};

export default PortfolioLandingPage;
