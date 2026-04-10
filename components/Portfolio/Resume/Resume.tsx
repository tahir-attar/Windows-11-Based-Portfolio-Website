import React, { useEffect, useRef, useState } from 'react';
import * as Styled from './Resume.styles';
import TextList from '../TextList/TextList';
import {
  FiDownload,
  FiGithub,
  FiGlobe,
  FiMail,
  FiPhoneOutgoing,
} from 'react-icons/fi';
import { SiLinkedin } from 'react-icons/si';
import PortfolioParagraph from '../Typography/PortfolioParagraph/PortfolioParagraph';
import ProfessionalExperience from '../ProfessionalExperience/ProfessionalExperience';
import Certification from '../Certification/Certification';
import Link from 'next/link';
import { IResumeData } from '../../../types/portfolio';

const Resume = (): JSX.Element => {
  const [data, setData] = useState<IResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [zoomIn] = useState(false);
  useEffect(() => {
    fetch('/api/admin/resume')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Styled.Container>
        <Styled.ResumeWrapper>
          <p style={{ color: '#888', padding: '2rem' }}>Loading resume...</p>
        </Styled.ResumeWrapper>
      </Styled.Container>
    );
  }

  if (!data) {
    return (
      <Styled.Container>
        <Styled.ResumeWrapper>
          <p style={{ color: '#888', padding: '2rem' }}>
            Resume data not found. Please set it up in the admin panel at{' '}
            <a href="/admin" style={{ color: '#2bff88' }}>
              /admin
            </a>
            .
          </p>
        </Styled.ResumeWrapper>
      </Styled.Container>
    );
  }

  const pi = data.personalInfo;
  const nameParts = pi.name.trim().split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  return (
    <Styled.Container>
      <Styled.ResumeWrapper $zoomIn={zoomIn}>
        <Styled.LeftColumn>
          <Styled.ContactInfo>
            {pi.website && (
              <Styled.ContactLink
                href={pi.website}
                target="_blank"
                rel="noopener"
              >
                <FiGlobe />
                {pi.website.replace(/^https?:\/\//, '')}
              </Styled.ContactLink>
            )}
            {pi.email && (
              <Styled.ContactLink
                href={`mailto:${pi.email}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiMail />
                {pi.email}
              </Styled.ContactLink>
            )}
            {pi.location && <p>{pi.location}</p>}
          </Styled.ContactInfo>

          {data.keyTechSkills.length > 0 && (
            <TextList
              variant={'withHeader'}
              textBulletPoints={data.keyTechSkills}
              headerText={'Key Technical Skills'}
            />
          )}

          {data.otherSkills.length > 0 && (
            <TextList
              variant={'withHeader'}
              textBulletPoints={data.otherSkills}
              headerText={'Other Skills'}
            />
          )}

          {(data.nonTechSkills || []).length > 0 &&
            (() => {
              const flatSkills = (data.nonTechSkills || []).flatMap((group) =>
                group.items.map((item) => ({
                  text: item,
                  iconUrl:
                    group.iconUrl || '/assets/portfolio/bullets/check.svg',
                }))
              );
              return flatSkills.length > 0 ? (
                <TextList
                  variant={'withHeader'}
                  textBulletPoints={flatSkills}
                  headerText={'Non-Technical Skills'}
                />
              ) : null;
            })()}

          {(data.hobbies || []).length > 0 && (
            <TextList
              variant={'withHeader'}
              textBulletPoints={data.hobbies || []}
              headerText={'Hobbies & Interests'}
            />
          )}
        </Styled.LeftColumn>

        <Styled.RightColumn>
          <Styled.SummaryHeader>
            <Styled.Name>
              {firstName}
              {lastName && (
                <>
                  {' '}
                  <span className="last">{lastName}</span>
                </>
              )}
              {pi.suffix && <span className="suffix">, {pi.suffix}</span>}
            </Styled.Name>
            {pi.title && <Styled.Title>{pi.title}</Styled.Title>}

            <Styled.SocialLinksWrapper>
              {pi.linkedinUrl && (
                <Styled.SocialMediaLink
                  href={pi.linkedinUrl}
                  target={'_blank'}
                  rel="noopener"
                >
                  <SiLinkedin className={'social-media-icon'} />
                  LinkedIn
                </Styled.SocialMediaLink>
              )}
              {pi.githubUrl && (
                <Styled.SocialMediaLink
                  href={pi.githubUrl}
                  target={'_blank'}
                  rel="noopener"
                >
                  <FiGithub className={'social-media-icon'} />
                  GitHub
                </Styled.SocialMediaLink>
              )}
              {pi.email && (
                <Styled.SocialMediaLink
                  href={`mailto:${pi.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiMail className={'social-media-icon'} />
                  Email
                </Styled.SocialMediaLink>
              )}
              {pi.phone && (
                <Styled.SocialMediaLink href={`tel:${pi.phone}`}>
                  <FiPhoneOutgoing className={'social-media-icon'} />
                  {pi.phone}
                </Styled.SocialMediaLink>
              )}
              {pi.cvPdfUrl && (
                <Styled.SocialMediaLink href={pi.cvPdfUrl} download>
                  <FiDownload className={'social-media-icon'} />
                  Download CV
                </Styled.SocialMediaLink>
              )}
            </Styled.SocialLinksWrapper>

            <Styled.HR />

            {data.summary && (
              <Styled.Summary>
                <Styled.ResumeHeader>Summary</Styled.ResumeHeader>
                <PortfolioParagraph
                  margin={'0'}
                  paragraphText={data.summary}
                  withDarkColor={true}
                  variant={'medium'}
                  withAnimatedPresence={false}
                />
              </Styled.Summary>
            )}
          </Styled.SummaryHeader>

          {data.experience.length > 0 && (
            <>
              <Styled.ResumeHeader>Experience</Styled.ResumeHeader>
              {data.experienceIntro && (
                <PortfolioParagraph
                  margin={'0'}
                  paragraphText={data.experienceIntro}
                  withDarkColor={true}
                  variant={'medium'}
                  withAnimatedPresence={false}
                />
              )}
              {data.experience.map((exp, id) => (
                <ProfessionalExperience key={id} {...(exp as any)} />
              ))}
            </>
          )}

          <Styled.ResumeHeader>Highlighted Projects</Styled.ResumeHeader>
          <Styled.Projects>
            <p>
              Links to some of my projects and work can be found on{' '}
              <Link href={'/portfolio/projects'}>the projects page</Link> and
              details can be provided upon request.
            </p>
          </Styled.Projects>

          {data.education.length > 0 && (
            <>
              <Styled.ResumeHeader>Education</Styled.ResumeHeader>
              {data.education.map((edu, id) => (
                <Styled.EducationDetails key={id}>
                  <Styled.EduRow>
                    <span className="degree">
                      {edu.degree}
                      {edu.field ? ` — ${edu.field}` : ''}
                    </span>
                    {edu.institution && (
                      <span className="institution">{edu.institution}</span>
                    )}
                    {edu.duration && (
                      <span className="duration">{edu.duration}</span>
                    )}
                  </Styled.EduRow>
                  {(edu.cgpa || edu.percentage) && (
                    <Styled.EduMeta>
                      {edu.cgpa && (
                        <span>
                          CGPA: <strong>{edu.cgpa}</strong>
                        </span>
                      )}
                      {edu.percentage && (
                        <span>
                          Percentage: <strong>{edu.percentage}%</strong>
                        </span>
                      )}
                    </Styled.EduMeta>
                  )}
                </Styled.EducationDetails>
              ))}
            </>
          )}

          {(data.certifications || []).length > 0 && (
            <>
              <Styled.ResumeHeader>Certifications</Styled.ResumeHeader>
              {(data.certifications || []).map((cert, id) => (
                <Certification key={id} {...cert} />
              ))}
            </>
          )}
        </Styled.RightColumn>
      </Styled.ResumeWrapper>
    </Styled.Container>
  );
};

export default Resume;
