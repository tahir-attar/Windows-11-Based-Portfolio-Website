import React, { useEffect, useState } from 'react';
import * as Styled from './Loader.styles';
import Logo from '../Portfolio/Logo/Logo';

export interface Props {
  isOnScreen: boolean;
  loadingDuration: number;
}

/**
 *Renders main loading component
 *@function Loader
 *@param {boolean} isOnScreen - specifies whether element is on screen
 *@param {number} loadingDuration - duration of dummy loading in milliseconds, based on this duration, un-mounting animation will be toggled after duration - 500ms
 *@returns {JSX.Element} - Rendered CardContent component
 */
const Loader = ({ isOnScreen, loadingDuration }: Props): JSX.Element => {
  const [isLogoExpanded, setIsLogoExpanded] = useState(true);
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsLogoExpanded(false);
    }, loadingDuration - 1000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [loadingDuration]);
  return (
    <Styled.Container isOnScreen={isOnScreen} loadingDuration={loadingDuration}>
      <Logo isExpanded={isLogoExpanded} />
      <Styled.TextContainer>
        <Styled.ScrollText loadingDuration={loadingDuration}>
          <span style={{ color: '#3776AB' }}>Python</span> <br />
          <span style={{ color: '#FF6F61' }}>Machine Learning</span> <br />
          <span style={{ color: '#00A4EF' }}>AI</span> <br />
          <span style={{ color: '#61DAFB' }}>React</span> <br />
          <span style={{ color: '#F7DF1E' }}>Web Development</span> <br />
          <span style={{ color: '#FFFFFF' }}>Guitar 🎸</span>
        </Styled.ScrollText>
      </Styled.TextContainer>
    </Styled.Container>
  );
};

export default Loader;
