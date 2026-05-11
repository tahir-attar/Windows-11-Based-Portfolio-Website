import styled, { css } from 'styled-components';
import { slideTop } from '../../../design-system/reusableCss';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 1rem 5rem;
  @media ${({ theme }) => theme.media.tablet} {
    padding: 1rem;
    justify-content: flex-start;
  }
`;

export const TextWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 0;

  p {
    line-height: 1.6;
  }

  h1 {
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
  }

  @media ${({ theme }) => theme.media.tablet} {
    height: auto;
    h1 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    p {
      line-height: 1.4;
      font-size: 0.9rem;
    }
  }
`;

const buttonStyles = css`
  background: transparent;
  border: 0;
  cursor: pointer;

  .carousel-icon {
    font-size: 3rem;
    color: ${({ theme }) => theme.portfolio.primaryColor.light};
    transition: all 0.3s ease;
  }

  :hover .next {
    transform: translateX(5px);
  }

  :hover .prev {
    transform: translateX(-5px);
  }
`;

export const NextQuote = styled.button`
  ${buttonStyles}
`;

export const PrevQuote = styled.button`
  ${buttonStyles}
`;

export const ControlsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  animation: ${slideTop} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  @media ${({ theme }) => theme.media.tablet} {
    margin-top: 1.5rem;
  }
  @media ${({ theme }) => theme.media.phone} {
    margin-top: 1rem;
  }
`;
