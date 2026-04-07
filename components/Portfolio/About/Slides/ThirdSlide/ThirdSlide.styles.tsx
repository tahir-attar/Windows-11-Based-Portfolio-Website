import styled, { css } from 'styled-components';
import {
  rollInLeft,
  rollInRight,
  slideTop,
  slideBottom,
  slideOutKeyframes,
} from '../../../../../design-system/reusableCss';

interface HoverProps {
  isHovering: boolean;
}

export const DynamicIconText = styled.p<HoverProps>`
  font-size: 0.85rem;
  color: #fff;
  text-align: center;
  margin-top: 4px;

  ${({ isHovering }) =>
    isHovering
      ? css`
          visibility: visible;
          opacity: 1;
          animation: ${slideBottom} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            both;
        `
      : css`
          visibility: hidden;
          opacity: 0;
          animation: ${slideOutKeyframes} 0.3s ease-in both;
        `}
`;

export const ThirdSlide = styled.div`
  position: relative;
  overflow: hidden;
  min-height: 100vh;

  .skills-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .glass-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 4rem;
    margin-top: 2rem;
    justify-content: center;
  }

  .glass-content {
    z-index: 5;
    display: flex;
    flex-direction: column;
    min-width: 40%;
    max-width: 46%;
    flex: 1 1 40%;
    padding: 2rem;
    border-radius: ${({ theme }) => theme.borderRadius};
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    animation: ${slideTop} 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

    .icon-skills {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin: 1rem 0;
    }

    .icon-skills-grid {
      display: grid;
      grid-template-columns: repeat(8, 5rem);
      gap: 0.25rem;
      margin: 1rem 0;
      align-items: start;
    }

    .tech-skills {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }

  :after {
    content: '';
    position: absolute;
    bottom: -10px;
    right: 55%;
    width: 700px;
    height: 700px;
    background: #383838;
    background: linear-gradient(40deg, #000000 33%, #383838 69%);
    border-radius: 50%;
    animation: ${rollInLeft} 2s cubic-bezier(0.23, 1, 0.32, 1) both;
  }

  :before {
    content: '';
    position: absolute;
    top: 10px;
    left: 55%;
    width: 700px;
    height: 700px;
    background: #383838;
    background: linear-gradient(40deg, #ffc130 22%, #383838 70%, #000000 89%);
    border-radius: 50%;
    animation: ${rollInRight} 2s cubic-bezier(0.23, 1, 0.32, 1) both;
  }

  @media ${({ theme }) => theme.media.tablet} {
    .skills-wrapper {
      h1 {
        font-size: 2.5rem;
      }
    }

    .glass-wrapper {
      gap: 1rem;
      flex-direction: column;
      margin-top: 1rem;
      width: 100%;
    }

    .glass-content {
      width: 95%;
      max-width: 95%;
      flex: none;
      margin: 0 auto;
      padding: 1rem;

      h1 {
        font-size: 1.5rem;
        margin: 0;
      }

      p {
        margin: 0;
      }

      .icon-skills {
        margin: 0;
      }

      .icon-skills-grid {
        grid-template-columns: repeat(8, minmax(0, 1fr));
        gap: 0.1rem;
        margin: 0.5rem 0;
      }

      .tech-skills {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
    }
  }

  @media ${({ theme }) => theme.media.phone} {
    .glass-content {
      .icon-skills-grid {
        grid-template-columns: repeat(6, minmax(0, 1fr));
        gap: 0.35rem;
      }
    }
  }
`;
