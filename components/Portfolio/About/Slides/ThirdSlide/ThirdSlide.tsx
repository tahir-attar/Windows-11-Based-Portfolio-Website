import React, { useEffect, useState } from 'react';
import * as Styled from './ThirdSlide.styles';
import SectionHeader from '../../../Typography/SectionHeader/SectionHeader';
import PortfolioParagraph from '../../../Typography/PortfolioParagraph/PortfolioParagraph';
import Slide from '../../../Slide/Slide';
import SkillListItem from '../../../SkillListItem/SkillListItem';
import { useAboutConfig } from '../../About.config';
import SkillIcon from '../../../SkillIcon/SkillIcon';

interface SkillBoxIcon {
  label: string;
  iconUrl: string;
}

interface TechSkillRow {
  id: string;
  section: string;
  value: string;
}

interface SkillBox {
  id: string;
  header: string;
  icons: SkillBoxIcon[];
  techSkills: TechSkillRow[];
}

interface AboutSkillsData {
  subtitleText: string;
  skillBoxes: SkillBox[];
}

interface DynamicIconProps {
  iconUrl: string;
  label: string;
}

const DynamicSkillIcon = ({ iconUrl, label }: DynamicIconProps): JSX.Element => {
  const [hovered, setHovered] = useState(false);

  return (
    <figure
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        minWidth: 0,
        margin: '0',
        cursor: 'default',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={iconUrl}
        alt={`Icon of ${label}`}
        style={{
          width: '100%',
          maxWidth: '50px',
          height: 'auto',
          aspectRatio: '1 / 1',
          objectFit: 'contain',
          filter: hovered ? 'brightness(130%)' : 'brightness(100%)',
          transition: 'filter 0.2s ease',
        }}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
      <figcaption style={{ textAlign: 'center' }}>
        <Styled.DynamicIconText isHovering={hovered}>{label}</Styled.DynamicIconText>
      </figcaption>
    </figure>
  );
};

const ThirdSlide = (): JSX.Element => {
  const {
    frontendSkills,
    frontendTechSkills,
    backendSkills,
    backendTechSkills,
  } = useAboutConfig();

  const [skillsData, setSkillsData] = useState<AboutSkillsData | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/about')
      .then((res) => {
        if (res.ok) return res.json();
        return null;
      })
      .then((data) => {
        if (data && data.skillBoxes && data.skillBoxes.length > 0) {
          setSkillsData(data);
        }
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const useDynamic = loaded && skillsData !== null;
  const numBoxes = useDynamic ? skillsData.skillBoxes.length : 2;
  const needsExtraHeight = numBoxes > 2;
  const slideHeight = needsExtraHeight ? 'auto' : '100vh';

  if (!loaded) {
    return (
      <Slide bgColor={'#010606'} height={'100vh'} anchorID={'third-slide'}>
        <Styled.ThirdSlide id={'third-slide'}>
          <div className="skills-wrapper">
            <SectionHeader variant={'small'} headerText={'Skills'} margin={'0'} color={'#2bff88'} />
          </div>
        </Styled.ThirdSlide>
      </Slide>
    );
  }

  return (
    <Slide bgColor={'#010606'} height={slideHeight} anchorID={'third-slide'}>
      <Styled.ThirdSlide id={'third-slide'}>
        <div className="skills-wrapper">
          <SectionHeader
            variant={'small'}
            headerText={'Skills'}
            margin={'0'}
            color={'#2bff88'}
          />
          <PortfolioParagraph
            margin={'0'}
            paragraphText={
              useDynamic
                ? skillsData.subtitleText
                : 'Languages I speak, Dev & Design Tools that I particularly enjoy'
            }
            withDarkColor={false}
            variant={'large'}
            withAnimatedPresence={true}
          />

          {useDynamic ? (
            <div className="glass-wrapper">
              {skillsData.skillBoxes.map((box) => (
                <div key={box.id} className="glass-content">
                  <SectionHeader
                    variant={'extraSmall'}
                    headerText={box.header}
                    margin={'0'}
                    color={'#2bff88'}
                  />
                  {box.icons.length > 0 && (
                    <div className="icon-skills-grid">
                      {box.icons.map((icon) => (
                        <DynamicSkillIcon
                          key={icon.iconUrl + icon.label}
                          iconUrl={icon.iconUrl}
                          label={icon.label}
                        />
                      ))}
                    </div>
                  )}
                  {box.techSkills.length > 0 && (
                    <ul className="tech-skills">
                      {box.techSkills.map((ts) => (
                        <SkillListItem
                          key={ts.id}
                          skillSection={ts.section}
                          skillValue={ts.value}
                        />
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-wrapper">
              <div className="glass-content">
                <SectionHeader
                  variant={'extraSmall'}
                  headerText={'Frontend'}
                  margin={'0'}
                  color={'#2bff88'}
                />
                <ul className={'icon-skills'}>
                  {frontendSkills.map((skill) => (
                    <li key={skill.id}>
                      <SkillIcon
                        iconSrc={skill.iconSrc}
                        text={skill.text}
                        iconSize={skill.iconSize}
                      />
                    </li>
                  ))}
                </ul>
                <ul className="tech-skills">
                  {frontendTechSkills.map((tech) => (
                    <SkillListItem
                      key={tech.id}
                      skillSection={tech.skillSection}
                      skillValue={tech.skillValue}
                    />
                  ))}
                </ul>
              </div>

              <div className="glass-content">
                <SectionHeader
                  variant={'extraSmall'}
                  headerText={'Backend'}
                  margin={'0'}
                  color={'#2bff88'}
                />
                <ul className={'icon-skills'}>
                  {backendSkills.map((skill) => (
                    <li key={skill.id}>
                      <SkillIcon
                        iconSrc={skill.iconSrc}
                        text={skill.text}
                        iconSize={skill.iconSize}
                      />
                    </li>
                  ))}
                </ul>
                <ul className="tech-skills">
                  {backendTechSkills.map((tech) => (
                    <SkillListItem
                      key={tech.id}
                      skillSection={tech.skillSection}
                      skillValue={tech.skillValue}
                    />
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </Styled.ThirdSlide>
    </Slide>
  );
};

export default ThirdSlide;
