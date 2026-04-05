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
            <img
              src={props.companyImg}
              alt={props.company}
              style={{ width: 32, height: 32, objectFit: 'contain', marginBottom: '4px' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          )}
          <Styled.OrgName>{props.company}</Styled.OrgName>
          {props.certificationName && <Styled.CertTitle>{props.certificationName}</Styled.CertTitle>}
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
            <Styled.CredentialLink href={props.url} target="_blank" rel="noopener noreferrer">
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
