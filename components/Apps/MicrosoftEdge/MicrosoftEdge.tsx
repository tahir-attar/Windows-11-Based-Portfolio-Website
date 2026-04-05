import React, { useState, useEffect, useMemo, useRef } from 'react';
import * as Styled from './MicrosoftEdge.styles';
import { FiSearch, FiRefreshCw, FiHome, FiX, FiArrowLeft } from 'react-icons/fi';
import {
  SiGithub,
  SiYoutube,
  SiStackoverflow,
  SiMdnwebdocs,
} from 'react-icons/si';

const quickLinks = [
  { id: 1, label: 'GitHub', icon: <SiGithub size={22} />, url: 'https://github.com' },
  { id: 2, label: 'YouTube', icon: <SiYoutube size={22} color="#ff0000" />, url: 'https://youtube.com' },
  { id: 3, label: 'Stack Overflow', icon: <SiStackoverflow size={22} color="#f48024" />, url: 'https://stackoverflow.com' },
  { id: 4, label: 'MDN Docs', icon: <SiMdnwebdocs size={22} color="#83d0f2" />, url: 'https://developer.mozilla.org' },
];

const allNewsItems = [
  { id: 1, category: 'Technology', title: 'Microsoft unveils next-generation AI features in Edge browser', image: 'https://picsum.photos/seed/edge1/320/180', source: 'Microsoft Blog', time: '2h ago' },
  { id: 2, category: 'Web Dev', title: 'The future of web development: What to expect in 2026', image: 'https://picsum.photos/seed/edge2/320/180', source: 'Dev.to', time: '4h ago' },
  { id: 3, category: 'Science', title: 'Researchers discover new method to improve battery efficiency', image: 'https://picsum.photos/seed/edge3/320/180', source: 'Nature', time: '6h ago' },
  { id: 4, category: 'Design', title: 'Fluent Design System: How Microsoft shapes modern UI', image: 'https://picsum.photos/seed/edge4/320/180', source: 'UX Collective', time: '8h ago' },
  { id: 5, category: 'AI', title: 'GPT-5 benchmark results exceed expectations across all domains', image: 'https://picsum.photos/seed/edge5/320/180', source: 'OpenAI Blog', time: '1h ago' },
  { id: 6, category: 'Security', title: 'New zero-day vulnerability found in popular JavaScript libraries', image: 'https://picsum.photos/seed/edge6/320/180', source: 'SecurityWeek', time: '3h ago' },
  { id: 7, category: 'Cloud', title: 'AWS announces 30% price reduction for cloud storage tiers', image: 'https://picsum.photos/seed/edge7/320/180', source: 'AWS News', time: '5h ago' },
  { id: 8, category: 'Mobile', title: 'React Native 0.78 ships with major performance improvements', image: 'https://picsum.photos/seed/edge8/320/180', source: 'React Blog', time: '7h ago' },
  { id: 9, category: 'Open Source', title: 'Linux kernel 6.8 introduces new memory management features', image: 'https://picsum.photos/seed/edge9/320/180', source: 'LWN.net', time: '9h ago' },
  { id: 10, category: 'Business', title: 'Tech layoffs slow down as AI hiring picks up globally', image: 'https://picsum.photos/seed/edge10/320/180', source: 'Bloomberg', time: '11h ago' },
  { id: 11, category: 'Gaming', title: 'DirectX 13 announced with real-time path tracing support', image: 'https://picsum.photos/seed/edge11/320/180', source: 'GameDev News', time: '2h ago' },
  { id: 12, category: 'Web Dev', title: 'CSS container queries finally have full cross-browser support', image: 'https://picsum.photos/seed/edge12/320/180', source: 'CSS-Tricks', time: '4h ago' },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface Props {
  initialSearchQuery?: string;
}

const MicrosoftEdge = ({ initialSearchQuery }: Props = {}): JSX.Element => {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUrl, setCurrentUrl] = useState<string | null>(
    initialSearchQuery ? `https://www.bing.com/search?q=${encodeURIComponent(initialSearchQuery)}` : null
  );
  const [addressBarText, setAddressBarText] = useState(
    initialSearchQuery ? `bing.com/search?q=${initialSearchQuery}` : 'New tab'
  );
  const [isLoading, setIsLoading] = useState(initialSearchQuery ? true : false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const newsFeed = useMemo(() => shuffle(allNewsItems).slice(0, 4), []);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDate(now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const navigateTo = (url: string, label?: string) => {
    setCurrentUrl(url);
    setAddressBarText(label || url);
    setIsLoading(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const url = `https://www.bing.com/search?q=${encodeURIComponent(searchQuery)}`;
    navigateTo(url, `bing.com/search?q=${searchQuery}`);
  };

  const handleAddressBarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = addressBarText.trim();
    if (!val || val === 'New tab') return;
    const url = val.startsWith('http') ? val : `https://www.bing.com/search?q=${encodeURIComponent(val)}`;
    navigateTo(url, val);
  };

  const goHome = () => {
    setCurrentUrl(null);
    setAddressBarText('New tab');
    setSearchQuery('');
    setIsLoading(false);
  };

  const handleRefresh = () => {
    if (iframeRef.current && currentUrl) {
      setIsLoading(true);
      iframeRef.current.src = currentUrl;
    }
  };

  return (
    <Styled.Container>
      {!currentUrl && <Styled.BackgroundOverlay />}

      <Styled.TopBar>
        <Styled.NavBtn onClick={goHome} title="Home">
          <FiHome size={14} />
        </Styled.NavBtn>
        <Styled.NavBtn onClick={handleRefresh} title="Refresh" disabled={!currentUrl}>
          <FiRefreshCw size={14} />
        </Styled.NavBtn>

        <form onSubmit={handleAddressBarSubmit} style={{ flex: 1, display: 'flex' }}>
          <Styled.AddressBarInput
            value={addressBarText}
            onChange={(e) => setAddressBarText(e.target.value)}
            onFocus={(e) => { if (e.target.value === 'New tab') setAddressBarText(''); }}
            onBlur={(e) => { if (!e.target.value.trim()) setAddressBarText(currentUrl ? currentUrl : 'New tab'); }}
          />
        </form>

        {currentUrl && (
          <Styled.NavBtn onClick={goHome} title="Close page">
            <FiX size={14} />
          </Styled.NavBtn>
        )}
      </Styled.TopBar>

      {currentUrl ? (
        <Styled.BrowserFrame>
          {isLoading && <Styled.LoadingBar />}
          <iframe
            ref={iframeRef}
            src={currentUrl}
            style={{ width: '100%', height: '100%', border: 'none' }}
            onLoad={() => setIsLoading(false)}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            title="Edge browser"
          />
        </Styled.BrowserFrame>
      ) : (
        <>
          <Styled.Hero>
            <Styled.Clock>{time}</Styled.Clock>
            <Styled.DateText>{date}</Styled.DateText>

            <Styled.SearchForm onSubmit={handleSearch}>
              <Styled.BingLogo>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M5 3L9.5 4.5V17.5L14 15L15.5 11.5L10.5 9.5L18 7L19 19L9.5 22L5 19.5V3Z" fill="#008272" />
                </svg>
                Bing
              </Styled.BingLogo>
              <Styled.SearchInput
                type="text"
                placeholder="Search the web"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Styled.SearchButton type="submit">
                <FiSearch size={18} />
              </Styled.SearchButton>
            </Styled.SearchForm>

            <Styled.QuickLinks>
              {quickLinks.map((link) => (
                <Styled.QuickLink
                  key={link.id}
                  onClick={() => navigateTo(link.url, link.url.replace('https://', ''))}
                >
                  <Styled.QuickLinkIcon>{link.icon}</Styled.QuickLinkIcon>
                  <Styled.QuickLinkLabel>{link.label}</Styled.QuickLinkLabel>
                </Styled.QuickLink>
              ))}
            </Styled.QuickLinks>
          </Styled.Hero>

          <Styled.NewsSection>
            <Styled.NewsSectionTitle>My Feed</Styled.NewsSectionTitle>
            <Styled.NewsGrid>
              {newsFeed.map((item) => (
                <Styled.NewsCard key={item.id}>
                  <Styled.NewsImage src={item.image} alt={item.title} />
                  <Styled.NewsBody>
                    <Styled.NewsCategory>{item.category}</Styled.NewsCategory>
                    <Styled.NewsTitle>{item.title}</Styled.NewsTitle>
                    <Styled.NewsMeta>{item.source} · {item.time}</Styled.NewsMeta>
                  </Styled.NewsBody>
                </Styled.NewsCard>
              ))}
            </Styled.NewsGrid>
          </Styled.NewsSection>
        </>
      )}
    </Styled.Container>
  );
};

export default MicrosoftEdge;
