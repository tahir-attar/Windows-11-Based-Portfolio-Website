import styled from 'styled-components';
import { IHighlightedProject } from '../../../types/portfolio';
import { slideTop, trackingInExpand } from '../../../design-system/reusableCss';

type ContainerProps = Pick<IHighlightedProject, 'slideBgColor' | 'slideHeight'>;

export const Container = styled.section<ContainerProps>`
  display: flex;
  height: ${({ slideHeight }) => slideHeight || '100%'};
  background-color: ${({ slideBgColor }) => slideBgColor};
  position: relative;
  scroll-snap-align: center;

  @media ${({ theme }) => theme.media.tablet} {
    flex-direction: column;
  }
`;

/**
 * LEFT COLUMN
 */
export const LeftColumn = styled.div`
  width: 50%;
  padding: 6rem 0 3rem 5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${({ theme }) => theme.media.tablet} {
    width: 100%;
    padding: 0.5rem;
    height: auto;
    min-height: 35%;
    align-items: flex-end;
  }
  @media ${({ theme }) => theme.media.phone} {
    height: auto;
    min-height: 30%;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 0.5rem 0.25rem;
  }
`;
export const ImageWrapper = styled.div`
  transform: perspective(1500px) rotateY(20deg);
  transition: transform 1s ease 0s;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    transform: perspective(3000px) rotateY(5deg);
  }

  @media ${({ theme }) => theme.media.tablet} {
    justify-content: flex-end;
    align-items: flex-end;
  }
`;

export const Figure = styled.figure`
  position: relative;
  display: flex;
  height: 100%;
  gap: 1rem;
`;
export const SlideNumber = styled.div`
  z-index: ${({ theme }) => theme.zIndex.lowPriority};
  position: absolute;
  top: 5%;
  right: 0;
  animation: ${slideTop} 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation-delay: 250ms;

  @media ${({ theme }) => theme.media.phone} {
    img {
      width: 150px;
      height: auto;
    }
  }
`;

export const Figcaption = styled.figcaption`
  gap: 1rem;
  display: flex;
  margin-left: auto;
  align-items: center;
  justify-content: center;

  h3 {
    font-size: 1rem;
    writing-mode: vertical-lr;
    color: ${({ theme }) => theme.portfolio.primaryColor.light};
    animation: ${trackingInExpand} 1.2s cubic-bezier(0.215, 0.61, 0.355, 1) both;
  }

  @media ${({ theme }) => theme.media.phone} {
    h3 {
      font-size: 0.55rem;
    }
  }
`;

/**
 * RIGHT COLUMN
 */
export const RightColumn = styled.div`
  width: 50%;
  padding: 1rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    text-align: center;
    line-height: 1;
    margin-bottom: 1rem;
  }

  @media ${({ theme }) => theme.media.tablet} {
    width: 100%;
    height: auto;
    min-height: 65%;
    padding: 0.75rem;
    justify-content: flex-start;
    h1 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    p {
      margin: 0.5rem 0;
      font-size: 0.9rem;
    }
  }
  @media ${({ theme }) => theme.media.phone} {
    min-height: auto;
    h1 {
      font-size: 1.25rem;
      margin-bottom: 0.25rem;
    }
    p {
      margin: 0.25rem 0;
      font-size: 0.85rem;
    }
  }
`;

export const IconWrapper = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  animation: ${slideTop} 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  flex-wrap: wrap;

  @media ${({ theme }) => theme.media.phone} {
    gap: 0.5rem;
  }
`;
export const Icon = styled.li`
  .tech-icon {
    font-size: 2rem;
    color: #2bff88;
  }

  img.tech-icon {
    width: 2rem;
    height: 2rem;
    object-fit: contain;
    display: inline-block;
    /* Filter properly generated to match #2bff88 */
    filter: brightness(0) saturate(100%) invert(84%) sepia(55%) saturate(3062%)
      hue-rotate(85deg) brightness(105%) contrast(105%);
  }

  @media ${({ theme }) => theme.media.phone} {
    .tech-icon {
      font-size: 1.25rem;
    }

    img.tech-icon {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
  flex-wrap: wrap;

  a {
    width: 280px;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${slideTop} 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    animation-delay: 250ms;
  }

  @media ${({ theme }) => theme.media.tablet} {
    gap: 0.75rem;
    margin-top: 0.5rem;
    a {
      width: calc(50% - 0.375rem);
      min-width: 120px;
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
    }
  }

  @media ${({ theme }) => theme.media.phone} {
    gap: 0.5rem;
    margin-top: 0.25rem;
    a {
      width: calc(50% - 0.25rem);
      min-width: 100px;
      padding: 0.4rem 0.75rem;
      font-size: 0.8rem;
    }
  }
`;
