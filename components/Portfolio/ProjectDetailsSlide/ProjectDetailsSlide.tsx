import React, { useEffect, useRef, useState } from 'react';
import * as Styled from './ProjectDetailsSlide.styles';
import TextCarousel from '../TextCarousel/TextCarousel';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import { ICarouselQuote } from '../../../types/portfolio';

export interface Props {
  slideHeight: string;
  slideBgColor: string;
  projectMobileImg: string;
  projectName: string;
  projectQuotes: ICarouselQuote[];
  mobileImgWidth?: number | null;
  mobileImgHeight?: number | null;
  detailsImg?: string;
  hideArrows?: boolean;
}

const ProjectDetailsSlide = ({
  slideHeight,
  slideBgColor,
  projectName,
  projectMobileImg,
  projectQuotes,
  mobileImgWidth,
  mobileImgHeight,
  detailsImg,
  hideArrows = false,
}: Props): JSX.Element => {
  const imgSrc = detailsImg || projectMobileImg;
  const containerRef = useRef<HTMLDivElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);
  const [isElementVisible] = useIntersectionObserver(containerRef, {
    threshold: 0.5,
  });
  const [isOnScreen, setIsOnScreen] = useState(false);
  const [isTapped, setIsTapped] = useState(false);

  useEffect(() => {
    if (isElementVisible && !isOnScreen) setIsOnScreen(true);
  }, [isElementVisible, isOnScreen]);

  const handleFigureTap = () => {
    setIsTapped(!isTapped);
  };

  const randomKey = `${~~Math.random() * 10000}${isOnScreen}`;

  return (
    <Styled.Container
      ref={containerRef}
      key={randomKey}
      slideHeight={slideHeight}
      slideBgColor={slideBgColor}
    >
      {isOnScreen && (
        <>
          <Styled.RightColumn>
            <TextCarousel quotes={projectQuotes} hideArrows={hideArrows} />
          </Styled.RightColumn>

          <Styled.LeftColumn>
            <Styled.LevitatingWrapper>
              <Styled.Figure
                ref={figureRef}
                figureWidth={mobileImgWidth ?? undefined}
                figureHeight={mobileImgHeight ?? undefined}
                isTapped={isTapped}
                onClick={handleFigureTap}
              >
                {[1, 2, 3, 4].map((id) => (
                  <img key={id} src={imgSrc} alt={projectName} />
                ))}
              </Styled.Figure>
            </Styled.LevitatingWrapper>
          </Styled.LeftColumn>
        </>
      )}
    </Styled.Container>
  );
};

export default ProjectDetailsSlide;
