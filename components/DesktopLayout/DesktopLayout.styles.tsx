import styled, { createGlobalStyle } from 'styled-components';

export const DesktopGlobalStyle = createGlobalStyle`
  html, body, #__next {
    overflow: clip !important;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
`;

interface Props {
  isInNightLightMode: boolean;
  screenBrightness: string;
  animationDelay: number;
}

export const Container = styled.section<Props>`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: clip;
  /**
  * In the below filter we apply "brightness control" feature and "night light" feature
  * By turning on "night light" sepia filter will be added, and brightness is directly controlled by "screenBrightness"
  */
  filter: ${({ screenBrightness, isInNightLightMode }) =>
    `brightness(${screenBrightness}%) ${
      isInNightLightMode ? `sepia(70%)` : ''
    }`};

  animation: slide-in-bottom 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation-delay: ${({ animationDelay }) => `${animationDelay}ms` || '6100ms'};
  @keyframes slide-in-bottom {
    0% {
      transform: translateY(1000px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
