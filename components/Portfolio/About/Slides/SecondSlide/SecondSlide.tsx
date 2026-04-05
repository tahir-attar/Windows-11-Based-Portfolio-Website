import React from 'react';
import * as Styled from './SecondSlide.styles';
import SectionHeader from '../../../Typography/SectionHeader/SectionHeader';
import PortfolioParagraph from '../../../Typography/PortfolioParagraph/PortfolioParagraph';
import Slide from '../../../Slide/Slide';
import WithSparkles from '../../../WithSparkles/WithSparkles';

/**
 *Renders second slide in About Portfolio presentation
 *@function SecondSlide
 *@returns {JSX.Element} - Rendered SecondSlide component
 */
const SecondSlide = (): JSX.Element => {
  return (
    <Slide bgColor={'#4831d4'} height={'100vh'} anchorID={'second-slide'}>
      <Styled.SecondSlide className="page second-page">
        <div className="left-column">
          <SectionHeader
            variant={'medium'}
            headerText={'Design'}
            margin={'0'}
            color={'#2bff88'}
          />

          <PortfolioParagraph
            margin={'0'}
            withDarkColor={false}
            variant={'large'}
            withAnimatedPresence={true}
          >
            💫 I approach development with a design-first mindset, focusing on creating{' '}
            <WithSparkles color={'yellow'}>
              intuitive, user-centric interfaces
            </WithSparkles>{' '}
            that feel seamless and engaging. My goal is not just to
            build applications, but to craft meaningful digital
            experiences that are both visually appealing and
            functionally efficient.
          </PortfolioParagraph>
        </div>
        <div className="right-column">
          <PortfolioParagraph
            margin={'0'}
            paragraphText={
              '🧑🏻‍💻 I specialize in building intelligent and scalable systems by combining machine learning with modern web technologies. From developing data-driven models to integrating them into real-world applications, I focus on creating solutions that are efficient, adaptive, and impactful. My work bridges the gap between AI and user experience.'
            }
            withDarkColor={false}
            variant={'large'}
            withAnimatedPresence={true}
          />
          <SectionHeader
            variant={'medium'}
            headerText={'Engineering'}
            margin={'0'}
            color={'#2bff88'}
          />
        </div>
      </Styled.SecondSlide>
    </Slide>
  );
};

export default SecondSlide;
