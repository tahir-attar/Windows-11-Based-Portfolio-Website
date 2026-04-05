import styled from 'styled-components';

export const FirstSlide = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 2rem;
  height: 100vh;
`;

export const Message = styled.div`
  padding: 0 10rem;

  @media ${({ theme }) => theme.media.tablet} {
    padding: 0 2rem;
  }

  @media ${({ theme }) => theme.media.phone} {
    padding: 0 1rem;
  }
`;
