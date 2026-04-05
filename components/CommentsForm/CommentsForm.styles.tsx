import styled from 'styled-components';
import { slidInCenter } from '../../design-system/reusableCss';

interface Props {
  isCommentPersisted: boolean;
}

export const Container = styled.div<Props>`
  width: 100%;
  animation: ${slidInCenter} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 95%;
    max-width: 500px;
    margin: 1rem auto;
    background: rgba(255, 255, 255, 0.05);
    padding: 2rem;
    border-radius: 15px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  button {
    align-self: center;

    :hover {
      color: #fff;
    }
  }

  :before {
    content: '';
    background: ${({ theme }) => theme.gradients.rainbow};
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(22px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing 20s linear infinite;
    opacity: ${({ isCommentPersisted }) => (isCommentPersisted ? '0.6' : '0')};
    transition: opacity 0.3s ease-in-out;
  }

  @keyframes glowing {
    0% {
      background-position: 0 0;
    }
    50% {
      background-position: 200% 0;
    }
    100% {
      background-position: 0 0;
    }
  }
`;

export const TextWrapper = styled.header`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.space.md};
`;

export const Message = styled.h1`
  margin-bottom: ${({ theme }) => theme.space.sm};
  color: ${({ theme }) => theme.portfolio.primaryColor.light};
`;
export const Text = styled.h2`
  font-size: 1.2rem;
  font-weight: ${({ theme }) => theme.fontWeight.normal};
  opacity: 0.8;
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: ${({ theme }) => theme.portfolio.primaryColor.light};
  height: 4.5rem;
  position: relative;
  pointer-events: auto;

  div {
    flex: 1;
    margin: 0 !important;
    padding: 0 !important;
    pointer-events: auto;
    fieldset {
      padding: 0 !important;
      margin: 0 !important;
      border-bottom: none !important;
    }
  }

  input {
    background: transparent !important;
    border: none !important;
    padding: 1.5rem 0 0.5rem 0 !important;
    height: 100% !important;
    font-size: 1.1rem !important;
    color: white !important;
    z-index: 10;
    position: relative;
    pointer-events: auto;
  }

  label {
    left: 0 !important;
    font-size: 0.9rem !important;
    color: rgba(255, 255, 255, 0.6) !important;
    pointer-events: none;
    z-index: 5;
  }
`;

export const GenderGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 1rem 0;

  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-size: 1rem;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.05);
    }
  }

  input[type='radio'] {
    width: 1.2rem;
    height: 1.2rem;
    accent-color: ${({ theme }) => theme.portfolio.primaryColor.light};
  }
`;

export const Error = styled.span`
  color: #ff4d4d;
  font-size: 0.8rem;
  text-align: center;
`;
