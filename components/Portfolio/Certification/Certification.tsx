import React from 'react';
import * as Styled from './Certification.styles';
import PortfolioParagraph from '../Typography/PortfolioParagraph/PortfolioParagraph';
import TextList from '../TextList/TextList';
import { FiExternalLink } from 'react-icons/fi';
import { ICertification } from '../../../types/portfolio';

const Certification = (props: ICertification): JSX.Element => {
  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.CertName>
          {props.companyImg && (
            <Styled.OrgLogo
              src={props.companyImg}
              alt={props.company}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
          <Styled.CertInfo>
            <Styled.OrgName>{props.company}</Styled.OrgName>
            {props.certificationName && (
              <Styled.CertTitle>{props.certificationName}</Styled.CertTitle>
            )}
          </Styled.CertInfo>
        </Styled.CertName>
        <Styled.TimeFrame>{props.timeFrame}</Styled.TimeFrame>
      </Styled.Header>

      {props.description && (
        <Styled.DescriptionRow>
          <PortfolioParagraph
            margin={'0'}
            paragraphText={props.description}
            withDarkColor={true}
            variant={'medium'}
            withAnimatedPresence={false}
          />
          {props.url && (
            <Styled.CredentialLink
              href={props.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiExternalLink />
              View
            </Styled.CredentialLink>
          )}
        </Styled.DescriptionRow>
      )}

      {props.bullets && props.bullets.length > 0 && (
        <TextList variant={'simple'} textBulletPoints={props.bullets} />
      )}
    </Styled.Container>
  );
};

export default Certification;
