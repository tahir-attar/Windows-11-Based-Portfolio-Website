import React, { useRef } from 'react';
import * as Styled from './WidgetsModalContent.styles';
import WidgetCard from '../WidgetCard/WidgetCard';
import WeatherWidget from '../WeatherWidget/WeatherWidget';
import NewsWidget from '../NewsWidget/NewsWidget';
import TodoWidget from '../TodoWidget/TodoWidget';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import TechWidget from '../TechWidget/TechWidget';
import { useActions } from '../../hooks/useActions';
import { useCloseModalIfClickedOutside } from '../../hooks/useCloseIfClickedOutside';

/**
 *Renders content for sliding widget modal, namely weather and to-do widgets. Additionally, renders news widgets that are pre-fetched, pre-generated on server.
 *@function WidgetsModalContent
 *@returns {JSX.Element} - Rendered WidgetsModalContent component
 */
const WidgetsModalContent = (): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { newsArticles } = useTypedSelector((state) => state.news);
  const { isWidgetOpen } = useTypedSelector((state) => state.ui);
  const { closeWidgetsModal } = useActions();

  const [weather, setWeather] = React.useState({
    temp: 22,
    desc: 'Loading...',
    hum: 50,
    icon: '/assets/icons/widget/sun.svg'
  });

  React.useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=17.2917&longitude=74.3255&current_weather=true&hourly=relative_humidity_2m')
      .then(res => res.json())
      .then(data => {
        const temp = data.current_weather?.temperature || 22;
        const code = data.current_weather?.weathercode || 0;
        const isDay = data.current_weather?.is_day;
        let details = 'Clear';
        let icon = isDay ? '/assets/icons/widget/sun.svg' : '/assets/icons/widget/moon.svg';
        
        if (code > 0 && code <= 3) details = 'Partly Cloudy';
        else if (code >= 45 && code <= 48) details = 'Foggy';
        else if (code >= 51 && code <= 67) { details = 'Rain'; icon = '/assets/icons/widget/weather.svg'; }
        else if (code >= 71 && code <= 82) details = 'Snow';
        else if (code >= 95) { details = 'Thunderstorm'; icon = '/assets/icons/widget/weather.svg'; }
        
        const currentHour = new Date().getHours();
        const hum = data.hourly?.relative_humidity_2m?.[currentHour] || 50;
        
        setWeather({ temp, desc: details, hum, icon });
      })
      .catch(() => setWeather({ temp: 22, desc: 'Not Avail.', hum: 50, icon: '/assets/icons/widget/sun.svg' }));
  }, []);

  useCloseModalIfClickedOutside({
    modalRef: containerRef,
    closeModalFunction: closeWidgetsModal,
    isModalOpen: isWidgetOpen,
  });

  return (
    <Styled.Container ref={containerRef}>
      <Styled.Header>
        <WidgetCard
          cardHeader={'Powered by'}
          headerIcon={'/assets/portfolio/skills/typescript-original.svg'}
          iconSize={{ width: 15, height: 15 }}
        >
          <TechWidget />
        </WidgetCard>
        <WidgetCard
          cardHeader={'Weather'}
          headerIcon={'/assets/icons/widget/weather.svg'}
          iconSize={{ width: 20, height: 20 }}
        >
          <WeatherWidget
            location={'Kadegaon, India'}
            temperature={weather.temp}
            forecastDetails={weather.desc}
            humidity={weather.hum}
            iconSrc={weather.icon}
          />
        </WidgetCard>
      </Styled.Header>

      <WidgetCard
        cardHeader={'To Do'}
        headerIcon={'/assets/icons/widget/todo.png'}
        iconSize={{ width: 16, height: 16 }}
      >
        <TodoWidget />
      </WidgetCard>

      <Styled.NewsGridWrapper>
        {newsArticles
          .filter(
            (article) =>
              article.urlToImage !== null &&
              article.title !== null &&
              article.urlToImage !== null &&
              article.url !== null
          )
          .slice(0, 15)
          .map((article, id) => (
            <NewsWidget
              key={`${article.title}${article.publishedAt}`}
              className={`grid-card-${id + 1}`}
              newsHeader={article.title!}
              newsSource={article.source.name}
              newsLink={article.url!}
              backgroundImg={article.urlToImage!}
              cardGradientColor={'rgba(3, 21, 41, 1)'}
            />
          ))}
      </Styled.NewsGridWrapper>
    </Styled.Container>
  );
};

export default WidgetsModalContent;
