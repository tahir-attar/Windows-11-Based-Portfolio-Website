import React, { FC } from 'react';
import * as Styled from './DesktopLayout.styles';
import Head from 'next/head';
import SystemTray from '../SystemTray/SystemTray';
import OpenedWindows from '../OpenedWindows/OpenedWindows';
import { useTypedSelector } from '../../hooks/useTypedSelector';

export interface Props {
  title: string;
  entranceAnimationDelay: number;
}

/**
 *Renders wrapper for desktop screens with system tray
 *@IMPORTANT: In Container that wraps children, we will "inject" global design-system orchestrated in redux, to turn on/off night light mode and increase/decrease brightness.
 *@function DesktopLayout
 *@param {string} title - title to be added to meta description
 *@param {ReactNode} children - content of layout
 *@returns {JSX.Element} - Rendered DesktopLayout component
 */
const DesktopLayout: FC<Props> = ({
  children,
  title,
  entranceAnimationDelay,
}): JSX.Element => {
  const { isInNightLightMode, screenBrightness } = useTypedSelector(
    (state) => state.ui
  );

  React.useEffect(() => {
    const lockScroll = () => {
      if (window.scrollY > 0 || window.scrollX > 0) {
        window.scrollTo(0, 0);
      }
      if (document.body.scrollTop > 0) document.body.scrollTop = 0;
      if (document.documentElement.scrollTop > 0) document.documentElement.scrollTop = 0;
    };
    
    // Aggressively capture any scroll events and trap them at 0
    window.addEventListener('scroll', lockScroll, { passive: false, capture: true });
    window.addEventListener('resize', lockScroll);
    return () => {
      window.removeEventListener('scroll', lockScroll, { capture: true });
      window.removeEventListener('resize', lockScroll);
    };
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#000000" />
        <title>{title}</title>
      </Head>
      <Styled.DesktopGlobalStyle />
      {/* GLOBAL STYLE CONTROLS(NIGHT LIGHT AND GLOBAL BRIGHTNESS) WILL BE INJECTED IN WRAPPING CONTAINER */}
      <Styled.Container
        isInNightLightMode={isInNightLightMode}
        screenBrightness={screenBrightness}
        animationDelay={entranceAnimationDelay}
      >
        {children}
        <OpenedWindows />
        <SystemTray />
      </Styled.Container>
    </>
  );
};

export default DesktopLayout;
