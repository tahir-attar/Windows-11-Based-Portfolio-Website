import React from 'react';
import * as Styled from './ProfessionalExperience.styles';
import PortfolioParagraph from '../Typography/PortfolioParagraph/PortfolioParagraph';
import TextList from '../TextList/TextList';

export type Props =
  | {
      variant: 'withResponsibilities';
      company: string;
      companyImg: string;
      role: string;
      timeFrame: string;
      shortSummary: string;
      responsibilities: { text: string; iconUrl: string }[];
    }
  | {
      variant: 'simple';
      role: string;
      company: string;
      companyImg: string;
      timeFrame: string;
      shortSummary: string;
    };

/**
 *@function ProfessionalExperience
 *@param {props} props - specified props
 *@returns {JSX.Element} - Rendered CardContent component
 */
const ProfessionalExperience = (props: Props): JSX.Element => {
  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.Company>
          {props.companyImg && (
            <Styled.CompanyLogo
              src={props.companyImg}
              alt={props.company}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
          <Styled.CompanyInfo>
            {props.company}
            <Styled.Role>{props.role}</Styled.Role>
          </Styled.CompanyInfo>
        </Styled.Company>

        <Styled.TimeFrame>{props.timeFrame}</Styled.TimeFrame>
      </Styled.Header>

      <PortfolioParagraph
        margin={'1rem 0'}
        paragraphText={props.shortSummary}
        withDarkColor={true}
        variant={'medium'}
        withAnimatedPresence={false}
      />
      {props.variant === 'withResponsibilities' && (
        <TextList
          variant={'simple'}
          textBulletPoints={props.responsibilities}
        />
      )}
    </Styled.Container>
  );
};
export default ProfessionalExperience;
