import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: linear-gradient(160deg, #0f1b2d 0%, #1a2e4a 40%, #0d2137 100%);
  position: relative;
  font-family: 'Segoe UI', sans-serif;
  color: #fff;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }
`;

export const BackgroundOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('https://picsum.photos/seed/edgebg/1600/900') center/cover no-repeat;
  opacity: 0.12;
  pointer-events: none;
  z-index: 0;
`;

export const TopBar = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.8rem;
  background: rgba(15, 27, 45, 0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
`;

export const NavBtn = styled.button<{ disabled?: boolean }>`
  background: none;
  border: none;
  color: ${({ disabled }) => disabled ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.5)'};
  cursor: ${({ disabled }) => disabled ? 'default' : 'pointer'};
  padding: 0.3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  &:hover {
    background: ${({ disabled }) => disabled ? 'none' : 'rgba(255,255,255,0.1)'};
    color: ${({ disabled }) => disabled ? 'rgba(255,255,255,0.2)' : '#fff'};
  }
`;

export const AddressBarInput = styled.input`
  flex: 1;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 0.3rem 0.8rem;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  outline: none;
  width: 100%;
  &:focus {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(0, 120, 212, 0.6);
    color: #fff;
  }
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

export const BrowserFrame = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 42px);
  background: #fff;
  overflow: hidden;
`;

export const LoadingBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 3px;
  width: 70%;
  background: linear-gradient(90deg, #0078d4, #00b4d8);
  z-index: 10;
  animation: loadingSlide 1.2s ease-in-out infinite;
  @keyframes loadingSlide {
    0% { width: 0%; left: 0; }
    50% { width: 70%; left: 15%; }
    100% { width: 0%; left: 100%; }
  }
`;

/* kept for any legacy references */
export const AddressBar = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 0.3rem 0.8rem;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
`;

export const RefreshBtn = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  padding: 0.3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  }
`;

export const Hero = styled.section`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem 1rem 2rem;
  gap: 1rem;
`;

export const Clock = styled.h1`
  font-size: 4rem;
  font-weight: 300;
  letter-spacing: 0.05em;
  margin: 0;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.4);
`;

export const DateText = styled.p`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
`;

export const SearchForm = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 580px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: border-color 0.2s, background 0.2s;
  margin-top: 0.5rem;

  &:focus-within {
    background: rgba(255, 255, 255, 0.18);
    border-color: rgba(0, 120, 212, 0.8);
  }
`;

export const BingLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0 0.8rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  border-right: 1px solid rgba(255, 255, 255, 0.15);
  white-space: nowrap;
`;

export const SearchInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  padding: 0.75rem 0.8rem;
  font-size: 0.95rem;
  color: #fff;
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

export const SearchButton = styled.button`
  background: #0078d4;
  border: none;
  color: #fff;
  padding: 0.75rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background 0.2s;
  &:hover {
    background: #106ebe;
  }
`;

export const QuickLinks = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
`;

export const QuickLink = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  text-decoration: none;
  color: #fff;
  cursor: pointer;
  &:hover > div {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

export const QuickLinkIcon = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, transform 0.2s;
  backdrop-filter: blur(6px);
`;

export const QuickLinkLabel = styled.span`
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.7);
`;

export const NewsSection = styled.section`
  position: relative;
  z-index: 1;
  padding: 0 1.5rem 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

export const NewsSectionTitle = styled.h2`
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
`;

export const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
`;

export const NewsCard = styled.div`
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s, background 0.2s;
  backdrop-filter: blur(8px);

  &:hover {
    transform: translateY(-3px);
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const NewsImage = styled.img`
  width: 100%;
  height: 130px;
  object-fit: cover;
`;

export const NewsBody = styled.div`
  padding: 0.8rem;
`;

export const NewsCategory = styled.span`
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #0078d4;
  letter-spacing: 0.05em;
`;

export const NewsTitle = styled.p`
  font-size: 0.82rem;
  line-height: 1.4;
  margin: 0.4rem 0;
  color: rgba(255, 255, 255, 0.9);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const NewsMeta = styled.span`
  font-size: 0.68rem;
  color: rgba(255, 255, 255, 0.4);
`;
