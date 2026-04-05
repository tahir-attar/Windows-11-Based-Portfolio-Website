import React from 'react';
import * as Styled from './SixthSlide.styles';
import SectionHeader from '../../../Typography/SectionHeader/SectionHeader';
import PortfolioParagraph from '../../../Typography/PortfolioParagraph/PortfolioParagraph';
import Slide from '../../../Slide/Slide';
import ActionButton from '../../../ActionButton/ActionButton';
import { FiBookOpen, FiChevronsRight } from 'react-icons/fi';
import { useRouter } from 'next/router';

/**
 *Renders fifth slide in About Portfolio presentation
 *@function SixthSlide
 *@returns {JSX.Element} - Rendered SixthSlide component
 */
const SixthSlide = (): JSX.Element => {
  const router = useRouter();
  const redirectToProjects = () => {
    router.push('/portfolio/projects');
  };
  const redirectToArticles = () => {
    router.push('/articles');
  };
  return (
    <Slide bgColor={'#010606'} height={'100vh'} anchorID={'sixth-slide'} snapAlign={'end'}>
      <Styled.SixthSlide>
        <div className="left-column">
          <div className="content-wrapper">
            <SectionHeader
              variant={'small'}
              headerText={'I build & create'}
              margin={'0'}
              color={'#2bff88'}
            />
            <PortfolioParagraph
              margin={'2rem 0 4rem 0'}
              paragraphText={`AI-powered web applications, machine learning models, and scalable systems. I focus on building real-world solutions that combine intelligent algorithms with modern web technologies.`}
              withDarkColor={false}
              variant={'large'}
              withAnimatedPresence={true}
            />
            <ActionButton
              buttonText={'Explore my work'}
              icon={<FiChevronsRight className="action-icon" />}
              onClick={redirectToProjects}
            />
          </div>
        </div>
        <div className="right-column">
          <div className="content-wrapper">
            <SectionHeader
              variant={'small'}
              headerText={'I research & share'}
              margin={'0'}
              color={'#2bff88'}
            />
            <PortfolioParagraph
              margin={'2rem 0 4rem 0'}
              paragraphText={
                'Sharing insights on AI, machine learning, and modern web development. I explore how intelligent systems can be built, optimized, and applied to solve real-world problems.'
              }
              withDarkColor={false}
              variant={'large'}
              withAnimatedPresence={true}
            />
            <ActionButton
              buttonText={'Read my insights'}
              icon={<FiBookOpen className="action-icon" />}
              onClick={redirectToArticles}
            />
          </div>
        </div>
      </Styled.SixthSlide>
    </Slide>
  );
};

export default SixthSlide;
