import styled from 'styled-components';

export const UL = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin: 1rem 0;
`;

export const LI = styled.li`
  display: grid;
  grid-template-columns: 1rem 1fr 1rem;
  align-items: center;
  gap: 0.5rem;
`;

export const SkillIcon = styled.img`
  width: 1rem;
  height: 1rem;
  object-fit: contain;
  display: inline-block;
`;

export const ListHeader = styled.h3`
  color: ${({ theme }) => theme.portfolio.primaryColor.dark};
  margin: 0;
  text-transform: capitalize;
  font-size: 1rem;
  font-weight: 600;
`;

export const ExternalLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  color: ${({ theme }) => theme.portfolio.resumeColors.accentColor};
`;
