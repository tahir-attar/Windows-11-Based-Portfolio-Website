import React, { useState } from 'react';
import * as Styled from './AllDevToArticles.styles';
import { InlineLink } from './AllDevToArticles.styles';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import DevToArticle from '../DevToArticle/DevToArticle';
import Navbar from '../Navbar/Navbar';
import SectionHeader from '../Typography/SectionHeader/SectionHeader';
import WithSparkles from '../WithSparkles/WithSparkles';
import ScrollHint from '../ScrollHint/ScrollHint';
import WaveDivider from '../WaveDivider/WaveDivider';
import ArtcileFiltersMenu from '../ArticleFiltersMenu/ArticleFiltersMenu';
import { BiCog } from 'react-icons/bi';
import { IDevToArticle } from '../../../types/redux/articles-reducer-types';

/**
 *Renders content for article page that maps dev.to api response (with all published articles) into the list of rendered articles
 *@function AllDevToArticles
 *@param {number} prop -
 *@returns {JSX.Element} - Rendered AllDevToArticles component
 */
const AllDevToArticles = (): JSX.Element => {
  const [showFiltersMenu, setShowFiltersMenu] = useState<boolean>(false);
  const { articles, filterOptions, sortArticlesBy } = useTypedSelector(
    (state) => state.articles
  );

  const toggleFiltersVisibility = () => setShowFiltersMenu((prev) => !prev);

  const getSortedArticles = (items: IDevToArticle[]): IDevToArticle[] => {
    const sortedArticles = [...items];

    if (!sortArticlesBy) {
      return sortedArticles;
    }

    switch (sortArticlesBy) {
      case 'likes':
        return sortedArticles.sort(
          (a, b) => b.public_reactions_count - a.public_reactions_count
        );
      case 'views':
        return sortedArticles.sort(
          (a, b) => b.page_views_count - a.page_views_count
        );
      case 'date':
      default:
        return sortedArticles.sort(
          (a, b) =>
            new Date(b.published_at).getTime() -
            new Date(a.published_at).getTime()
        );
    }
  };

  const displayedArticles = getSortedArticles(
    filterOptions.length > 0
      ? articles.filter((article) =>
          filterOptions.some((filterOption) =>
            article.tag_list.includes(filterOption)
          )
        )
      : articles
  );

  return (
    <Styled.Container>
      <Navbar isLogoExpanded={true} />

      <Styled.FirstSlide>
        <SectionHeader variant={'medium'} margin={'0'} color={'#fff'}>
          My recent posts from{' '}
          <WithSparkles color={'yellow'}>
            <InlineLink
              href={'https://dev.to/tahirattar/'}
              target="_blank"
              rel="noopener"
            >
              dev.to
            </InlineLink>
          </WithSparkles>
        </SectionHeader>
        <ScrollHint />
      </Styled.FirstSlide>
      <WaveDivider
        waveImg={'/assets/portfolio/blob-2.svg'}
        dividerHeight={'200px'}
      />

      <Styled.SecondSlide>
        <Styled.FiltersToggler
          onClick={toggleFiltersVisibility}
          title="Filter Settings"
        >
          <BiCog className={'filter__icon'} />
        </Styled.FiltersToggler>
        <ArtcileFiltersMenu isMenuVisible={showFiltersMenu} />
        <Styled.List>
          {displayedArticles.length === 0 ? (
            <Styled.EmptyMessage>
              No articles found. Please check back later!
            </Styled.EmptyMessage>
          ) : (
            displayedArticles.map((article) => (
              <Styled.LI key={article.id + article.title}>
                <DevToArticle {...article} />
              </Styled.LI>
            ))
          )}
        </Styled.List>
      </Styled.SecondSlide>
    </Styled.Container>
  );
};

export default AllDevToArticles;
