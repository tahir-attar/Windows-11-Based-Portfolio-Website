import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiSearch, FiExternalLink } from 'react-icons/fi';

interface Props {
  searchQuery: string;
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(160deg, #0f1b2d 0%, #1a2e4a 60%, #0d2137 100%);
  font-family: 'Segoe UI', sans-serif;
  color: #fff;
  gap: 1.5rem;
  animation: ${fadeIn} 0.4s ease both;
`;

const BingWordmark = styled.div`
  font-size: 2.2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  span:first-child { color: #008272; }
  span:nth-child(2) { color: #fff; }
  span:nth-child(3) { color: #0078d4; }
  span:nth-child(4) { color: #ffb900; }
  span:nth-child(5) { color: #d83b01; }
`;

const QueryBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 30px;
  padding: 0.7rem 1.4rem;
  font-size: 1rem;
  max-width: 500px;
  width: 90%;
  color: rgba(255, 255, 255, 0.85);
`;

const OpenButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #0078d4;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.65rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.2s, transform 0.15s;

  &:hover {
    background: #106ebe;
    transform: translateY(-1px);
  }
`;

const Note = styled.p`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.35);
  margin: 0;
`;

/**
 * Bing search launcher — opens Bing in a new tab since bing.com blocks iframes.
 */
const Bing = ({ searchQuery }: Props): JSX.Element => {
  const url = searchQuery
    ? `https://www.bing.com/search?q=${encodeURIComponent(searchQuery)}`
    : 'https://www.bing.com';

  useEffect(() => {
    window.open(url, '_blank');
  }, []);

  return (
    <Container>
      <BingWordmark>
        <span>B</span><span>i</span><span>n</span><span>g</span><span>!</span>
      </BingWordmark>

      {searchQuery && (
        <QueryBox>
          <FiSearch size={16} opacity={0.6} />
          {searchQuery}
        </QueryBox>
      )}

      <OpenButton href={url} target="_blank" rel="noreferrer">
        <FiExternalLink size={16} />
        Open in new tab
      </OpenButton>

      <Note>Search engines can't be embedded — results open in your browser.</Note>
    </Container>
  );
};

export default Bing;
