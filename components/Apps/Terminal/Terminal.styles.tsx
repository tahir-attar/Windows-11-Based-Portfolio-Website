import styled from 'styled-components';

export const Container = styled.section<{ terminalColor: string }>`
  width: 100%;
  height: 100%;

  .terminal-base {
    input, span, div {
      color: ${props => props.terminalColor} !important;
    }
  }
`;
