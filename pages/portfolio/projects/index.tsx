import type { NextPage, GetServerSideProps } from 'next';
import React from 'react';
import PortfolioLayout from '../../../components/Portfolio/PortfolioLayout/PortfolioLayout';
import HighlightedProjects from '../../../components/Portfolio/HighlightedProjects/HighlightedProjects';
import { adminDb } from '../../../utils/firebaseAdmin';
import { IHighlightedProject } from '../../../types/portfolio';

interface Props {
  projects: IHighlightedProject[];
}

const PortfolioProjectsPage: NextPage<Props> = ({ projects }) => {
  return (
    <PortfolioLayout title={'Tahir Attar | AI-Driven Development & Web Solutions'}>
      <HighlightedProjects projects={projects} />
    </PortfolioLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const snap = await adminDb
      .collection('portfolio_projects')
      .orderBy('order', 'asc')
      .get();

    if (snap.empty) {
      return { props: { projects: [] } };
    }

    const projects: IHighlightedProject[] = snap.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        order: data.order ?? 0,
        slideNumberImg: data.slideNumberImg ?? '',
        projectTitle: data.projectTitle ?? '',
        projectDescription: data.projectDescription ?? '',
        projectImg: data.projectImg ?? '',
        projectMobileImg: data.projectMobileImg ?? '',
        projectTechnologies: data.projectTechnologies ?? [],
        techIconNames: data.techIconNames ?? [],
        slideBgColor: data.slideBgColor ?? '#010606',
        slideHeight: data.slideHeight ?? '100vh',
        githubLink: data.githubLink ?? '',
        liveLink: data.liveLink ?? '',
        desktopImgWidth: data.desktopImgWidth ?? 800,
        desktopImgHeight: data.desktopImgHeight ?? 800,
        mobileImgWidth: data.mobileImgWidth ?? null,
        mobileImgHeight: data.mobileImgHeight ?? null,
        role: data.role ?? '',
        goal: data.goal ?? '',
        outcome: data.outcome ?? '',
        detailsImg: data.detailsImg ?? '',
      };
    });

    return { props: { projects } };
  } catch (err) {
    console.error('Failed to load projects:', err);
    return { props: { projects: [] } };
  }
};

export default PortfolioProjectsPage;
