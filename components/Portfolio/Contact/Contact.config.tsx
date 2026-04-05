import React, { ReactNode } from 'react';
import { FiGithub, FiInstagram, FiLinkedin } from 'react-icons/fi';

/**
 * Custom hook to get contact info data
 *@function useContactConfig
 *@returns {IMyContact[]} myContacts - the hook returns array of social contacts with id, icon, text and href of social platform
 */
export const useContactConfig = (): { myContacts: IMyContact[] } => {
  const myContacts: IMyContact[] = [
    {
      id: 1,
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="1em" height="1em" 
          fill="currentColor" 
          viewBox="0 0 16 16"
          className={'contact-icon'}
        >
          <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
        </svg>
      ),
      text: 'X',
      href: 'https://x.com/tahir_attar1109',
    },
    {
      id: 2,
      icon: <FiGithub className={'contact-icon'} />,
      text: 'GitHub',
      href: 'https://github.com/tahir-attar',
    },
    {
      id: 3,
      icon: <FiLinkedin className={'contact-icon'} />,
      text: 'LinkedIn',
      href: 'https://www.linkedin.com/in/tahir-attar/',
    },
    {
      id: 4,
      icon: <FiInstagram className={'contact-icon'} />,
      text: 'LinkedIn',
      href: 'https://www.instagram.com/its_tahir_1109/',
    },
  ];

  return { myContacts };
};

export interface IMyContact {
  id: number;
  icon: ReactNode;
  text: string;
  href: string;
}
