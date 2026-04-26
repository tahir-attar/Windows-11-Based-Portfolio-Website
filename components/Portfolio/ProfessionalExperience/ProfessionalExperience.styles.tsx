import styled from 'styled-components';

export const Container = styled.article`
  margin: 2rem 0;
`;
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
`;

export const Company = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  min-height: 2.75rem;
`;

export const CompanyLogo = styled.img`
  width: auto;
  height: auto;
  max-width: 6.5rem;
  max-height: 2.75rem;
  object-fit: contain;
  flex-shrink: 0;
`;

export const CompanyInfo = styled.h4`
  color: ${({ theme }) => theme.portfolio.resumeColors.accentColor};
  font-size: 1rem;
  margin: 0;
  line-height: 1.2;
  min-height: 2.75rem;

  span {
    display: block;
    color: ${({ theme }) => theme.portfolio.resumeColors.lightText};
  }
`;

export const Role = styled.span`
  font-size: 1rem;
`;

export const TimeFrame = styled.time`
  font-weight: bold;
  color: ${({ theme }) => theme.portfolio.resumeColors.lightText};
  white-space: nowrap;
`;
