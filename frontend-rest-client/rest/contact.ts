import { AxiosResponse } from 'axios';
import axios from 'axios';
import { ContactFormData } from '../../types/redux/contact-reducer-types';

export const sendEmailWith = (
  contactFormData: ContactFormData
): Promise<AxiosResponse<{ success: boolean }>> => {
  return axios.post('https://api.web3forms.com/submit', {
    access_key: 'fff7f029-09c3-4a3b-863e-13b93c0f450f',
    name: contactFormData.name,
    email: contactFormData.email,
    message: contactFormData.message,
    subject: `New Message from Portfolio: ${contactFormData.name}`,
  }, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  });
};
