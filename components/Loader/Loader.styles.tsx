import styled from 'styled-components';
import { Props } from './Loader';

interface ScrollTextProps {
  loadingDuration: number;
}

export const Container = styled.section<Props>`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 333;
  width: 100vw;
  height: 100vh;
  display: ${(p) => (p.isOnScreen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.portfolio.bgColor};
  gap: ${({ theme }) => theme.space.lg};
  font-family: 'Poppins', sans-serif;
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;

  animation: slide-out-blurred-top 500ms cubic-bezier(0.755, 0.05, 0.855, 0.06)
    both;
  animation-delay: ${({ loadingDuration }) => `${loadingDuration - 500}ms`};

  @keyframes slide-out-blurred-top {
    0% {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translateY(-120%) scale(0.98);
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const TextContainer = styled.div`
  height: 50px;
  overflow: hidden;
`;

export const ScrollText = styled.div<ScrollTextProps>`
  height: 100%;
  text-align: center;
  font-size: 2rem;
  color: ${({ theme }) => theme.portfolio.primaryColor.light};
  will-change: transform;
  transform: translateZ(0);

  transform: translateY(100%);
  animation: my-animation
    ${({ loadingDuration }) => `${Math.max(800, loadingDuration - 900)}ms`}
    linear;
  animation-delay: 700ms;

  @keyframes my-animation {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(-600%);
    }
  }

  @media ${({ theme }) => theme.media.phone} {
    font-size: 1.5rem;
  }
`;
