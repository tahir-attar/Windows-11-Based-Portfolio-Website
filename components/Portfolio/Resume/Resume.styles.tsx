import styled from 'styled-components';

export const Container = styled.section`
  min-height: 100vh;
  background-color: #ffffff;
  color: ${({ theme }) => theme.portfolio.resumeColors.darkText};
  display: flex;
  align-items: flex-start;
  justify-content: center;
  font-style: initial;
  padding: 3rem 1rem;
  overflow-x: hidden;
`;

export const ResumeWrapper = styled.div`
  background-color: ${({ theme }) => theme.portfolio.resumeColors.bgColor};
  padding: 2rem;
  width: 100%;
  max-width: 1200px;
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
    gap: 1.5rem;
  }
`;

/**
 * LEFT COLUMN
 */

export const LeftColumn = styled.aside`
  width: 30%;
  min-width: 160px;
  padding: 1rem 0;
  flex-shrink: 0;

  h3 {
    color: ${({ theme }) => theme.portfolio.resumeColors.accentColor};
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
  }
`;

export const ContactInfo = styled.address`
  font-style: normal;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ContactLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.portfolio.resumeColors.accentColor};
  word-break: break-all;
`;

/**
 * RIGHT COLUMN
 */

export const RightColumn = styled.section`
  width: 70%;
  min-width: 0;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SummaryHeader = styled.header``;

export const Name = styled.h1`
  font-size: 3.5rem;
  letter-spacing: -3px;

  .last {
    color: #2867b2;
  }

  .suffix {
    color: #1a1a1a;
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
    letter-spacing: -2px;
  }
`;

export const Title = styled.h2`
  font-size: 2rem;
  letter-spacing: -1px;
  line-height: 1;
`;

export const Summary = styled.summary`
  margin: 1rem 0;
`;

export const SocialLinksWrapper = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    gap: 0.5rem;
    flex-direction: column;
  }
`;

export const SocialMediaLink = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #000;

  .social-media-icon {
    color: ${({ theme }) => theme.portfolio.resumeColors.accentColor};
    margin-right: 0.25rem;
    font-size: 1.25rem;
  }
`;

export const ResumeHeader = styled.h3`
  font-size: 1.25rem;
  text-transform: uppercase;
  margin: 1rem 0;
  color: ${({ theme }) => theme.portfolio.resumeColors.accentColor};
`;

export const EducationDetails = styled.div`
  margin-bottom: 1.25rem;
`;

export const EduRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.3rem;
  flex-wrap: wrap;

  .degree {
    font-weight: 700;
    color: #1a1a1a;
    font-size: 0.95rem;
    flex: 0 0 auto;
  }

  .institution {
    color: ${({ theme }) => theme.portfolio.resumeColors.accentColor};
    font-weight: 600;
    text-align: center;
    flex: 1;
    font-size: 0.9rem;
    min-width: 80px;
  }

  .duration {
    color: ${({ theme }) => theme.portfolio.resumeColors.lightText};
    font-weight: bold;
    flex: 0 0 auto;
    text-align: right;
    font-size: 0.88rem;
  }
`;

export const EduMeta = styled.div`
  display: flex;
  gap: 1.5rem;
  color: #555;
  font-size: 0.82rem;
  margin-top: 0.2rem;
  flex-wrap: wrap;

  strong {
    color: #1a1a1a;
    font-weight: 600;
  }
`;

export const Projects = styled.div`
  a {
    color: ${({ theme }) => theme.portfolio.resumeColors.accentColor};
    font-weight: bold;
  }
`;

export const HR = styled.hr`
  border-top: 3px solid
    ${({ theme }) => theme.portfolio.resumeColors.accentColor};
  border-bottom: 0;
  margin: 1rem 0;
`;
