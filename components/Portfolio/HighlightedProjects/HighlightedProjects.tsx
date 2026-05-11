import React from 'react';
import * as Styled from './HighlightedProjects.styles';
import Navbar from '../Navbar/Navbar';
import SectionHeader from '../Typography/SectionHeader/SectionHeader';
import PortfolioParagraph from '../Typography/PortfolioParagraph/PortfolioParagraph';
import Image from 'next/image';
import ScrollHint from '../ScrollHint/ScrollHint';
import ProjectDesktopSlide from '../ProjectDesktopSlide/ProjectDesktopSlide';
import ProjectDetailsSlide from '../ProjectDetailsSlide/ProjectDetailsSlide';
import { IHighlightedProject, ICarouselQuote } from '../../../types/portfolio';

interface Props {
  projects: IHighlightedProject[];
}

function buildProjectQuotes(project: IHighlightedProject): ICarouselQuote[] {
  const quotes: ICarouselQuote[] = [];
  if (project.projectTitle) {
    quotes.push({
      id: 0,
      title: project.projectTitle,
      quote: project.projectDescription,
    });
  }
  if (project.goal)
    quotes.push({ id: 1, title: 'The Goal', quote: project.goal });
  if (project.role)
    quotes.push({ id: 2, title: 'My Role', quote: project.role });
  if (project.outcome)
    quotes.push({ id: 3, title: 'The Outcome', quote: project.outcome });
  return quotes;
}

const HighlightedProjects = ({ projects }: Props): JSX.Element => {
  return (
    <Styled.Container>
      <Navbar isLogoExpanded={true} />
      <Styled.ProjectsHero>
        <Styled.HeroLeftColumn>
          <SectionHeader
            variant={'medium'}
            headerText={`Featured Work`}
            margin={'0'}
            color={'#2bff88'}
          />
          <PortfolioParagraph
            margin={'1rem 0'}
            paragraphText={`Showcasing selected projects across machine learning and web development, focused on building intelligent and scalable applications.`}
            withDarkColor={false}
            variant={'large'}
            withAnimatedPresence
          />
        </Styled.HeroLeftColumn>
        <Styled.HeroRightColumn>
          <Styled.ImageContainer
            position={{ top: '0', right: '0' }}
            className={'laptop-wrapper'}
          >
            <Styled.FloatingImgContainer variant={'laptop'}>
              <Image
                src={'/assets/portfolio/landing-laptop.png'}
                quality={95}
                height={800}
                width={800}
                objectFit={'contain'}
                alt={'Laptop with open IDE'}
                priority
                className={'laptop'}
              />
            </Styled.FloatingImgContainer>
          </Styled.ImageContainer>
          <Styled.ImageContainer
            position={{ top: '35%', right: '10px' }}
            className={'mobile-wrapper'}
          >
            <Styled.FloatingImgContainer variant={'phone'}>
              <Image
                src={'/assets/portfolio/phone-2.png'}
                quality={95}
                height={450}
                width={350}
                alt={'Mobile device'}
                layout={'fixed'}
                objectFit={'contain'}
                priority
                className={'mobile'}
              />
            </Styled.FloatingImgContainer>
          </Styled.ImageContainer>
          <Styled.ImageContainer
            position={{ bottom: '6rem', left: '0' }}
            className={'watch-wrapper'}
          >
            <Styled.FloatingImgContainer variant={'watch'}>
              <Image
                src={'/assets/portfolio/landing-watch.png'}
                layout={'fixed'}
                quality={95}
                height={200}
                width={200}
                objectFit={'contain'}
                alt={'Smart watch'}
                priority
                className={'watch'}
              />
            </Styled.FloatingImgContainer>
          </Styled.ImageContainer>
        </Styled.HeroRightColumn>
        <ScrollHint />
      </Styled.ProjectsHero>

      {projects.map((project) => (
        <React.Fragment key={project.id ?? project.projectTitle}>
          <ProjectDesktopSlide {...project} />
          {(project.role || project.goal || project.outcome) && (
            <ProjectDetailsSlide
              slideHeight={project.slideHeight}
              slideBgColor={project.slideBgColor}
              projectMobileImg={project.projectMobileImg}
              projectName={project.projectTitle}
              projectQuotes={buildProjectQuotes(project)}
              mobileImgWidth={project.mobileImgWidth}
              mobileImgHeight={project.mobileImgHeight}
              detailsImg={project.detailsImg}
            />
          )}
        </React.Fragment>
      ))}
    </Styled.Container>
  );
};

export default HighlightedProjects;
