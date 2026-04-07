import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Trmnl from 'terminal-in-react';
import { useTerminalConfig } from './Terminal.config';
import * as Styled from './Terminal.styles';

/**
 *Renders Terminal Component
 *https://github.com/nitin42/terminal-in-react
 *@function Terminal
 *@returns {JSX.Element} - Rendered CardContent component
 */

const Terminal = (): JSX.Element => {
  const TerminalComponent = Trmnl as React.ComponentType<
    Record<string, unknown>
  >;

  const {
    openVSCode,
    openGoogle,
    openResume,
    openLanding,
    greetingMessage,
    hack,
    sad,
  } = useTerminalConfig();

  const router = useRouter();
  const [terminalColor, setTerminalColor] = useState('#2bff88');
  const colorOptions = [
    '#00ffff',
    '#ffff00',
    '#ff1493',
    '#1e90ff',
    '#ff6b35',
    '#2bff88',
    '#ff0000',
    '#9d00ff',
    '#00ff00',
    '#ff00ff',
    '#00CED1',
    '#7FFF00',
    '#FF4500',
    '#ADFF2F',
    '#F0E68C',
    '#00FFFF', // Cyan
    '#E0FFFF', // Light Cyan
    '#008B8B', // Dark Cyan
    '#AFEEEE', // Pale Turquoise
    '#7FFFD4', // Aquamarine
    '#FFB6C1', // Light Pink
    '#FFC0CB', // Pink
    '#FF69B4', // Hot Pink
    '#DB7093', // Pale Violet Red
    '#FF7F50', // Coral
    '#FFA07A', // Light Salmon
    '#FFD700', // Gold
    '#FFA500', // Orange
    '#FFDAB9', // Peach Puff
    '#F4A460', // Sandy Brown
    '#ADFF2F', // Green Yellow
    '#7CFC00', // Lawn Green
    '#00FA9A', // Medium Spring Green
    '#32CD32', // Lime Green
    '#40E0D0', // Turquoise
    '#4682B4', // Steel Blue
    '#87CEFA', // Light Sky Blue
    '#1E90FF', // Dodger Blue
    '#BA55D3', // Medium Orchid
    '#DA70D6', // Orchid
    '#FF8C00', // Dark Orange
  ];

  const redirectToPortfolio = () => {
    router.push('/portfolio');
    return 'Opening portfolio...';
  };
  const redirectToProjects = () => {
    router.push('/portfolio/projects');
    return 'Opening projects...';
  };

  const commandDescriptions = {
    clear: 'clears terminal output',
    help: 'lists all available commands',
    show: 'shows the terminal welcome message',
    code: 'opens Visual Studio Code',
    portfolio: 'opens portfolio page',
    projects: 'opens portfolio projects page',
    google: 'opens Google search',
    resume: 'opens resume link',
    popup: 'shows a popup alert',
    hack: 'runs playful hack simulation output',
    changecolor: 'changes terminal to a random color',
    SECRET_COMMAND: `💀  DON'T USE THIS COMMAND! OR YOU WILL BE FIRED!  💀`,
  };

  return (
    <Styled.Container terminalColor={terminalColor}>
      <TerminalComponent
        hideTopBar
        color={terminalColor}
        backgroundColor="#010606"
        barColor={terminalColor}
        outputColor={terminalColor}
        startState={'maximised'}
        style={{ fontWeight: 'bold', fontSize: '1.25rem' }}
        commands={{
          code: () => openVSCode(),
          google: () => openGoogle(),
          resume: () => openResume(),
          hack: () => hack,
          popup: () => alert('hello'),
          portfolio: redirectToPortfolio,
          projects: redirectToProjects,
          changecolor: () => {
            const randomColor =
              colorOptions[Math.floor(Math.random() * colorOptions.length)];
            setTerminalColor(randomColor);
            return `Terminal color changed to ${randomColor}`;
          },
          SECRET_COMMAND: () => {
            openLanding();
            return sad;
          },
        }}
        description={commandDescriptions}
        descriptions={commandDescriptions}
        msg={greetingMessage}
      />
    </Styled.Container>
  );
};

export default Terminal;
