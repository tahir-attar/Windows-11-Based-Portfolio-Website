import styled from 'styled-components';

export const Container = styled.article`
  margin: 2rem 0;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const CertName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const OrgName = styled.p`
  color: #2867B2;
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const CertTitle = styled.h4`
  color: ${({ theme }) => theme.portfolio.resumeColors.lightText};
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
`;

export const TimeFrame = styled.time`
  font-weight: bold;
  color: ${({ theme }) => theme.portfolio.resumeColors.lightText};
  white-space: nowrap;
  margin-left: 1rem;
`;

export const DescriptionRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin: 1rem 0;
`;

export const CredentialLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.portfolio.resumeColors.accentColor};
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
  text-decoration: none;
  padding: 3px 8px;
  border: 1px solid ${({ theme }) => theme.portfolio.resumeColors.accentColor};
  border-radius: 4px;
  margin-top: 2px;
  flex-shrink: 0;

  &:hover {
    opacity: 0.8;
  }

  svg {
    width: 12px;
    height: 12px;
  }
`;
