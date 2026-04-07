import { AxiosResponse } from 'axios';
import { makeRequest } from '../makeRequest';
import { DevToApiResponse } from '../../types/redux/articles-reducer-types';

export { getAllLatestArticles };

/**
 *@api will make GET request to our local firebase API /api/articles to fetch all portfolio articles
 *@function getAllLatestArticles
 *@returns {object} - promise with success and articles
 */
const getAllLatestArticles = (): Promise<AxiosResponse<DevToApiResponse>> => {
  const isServer = typeof window === 'undefined';
  const baseUrl = isServer
    ? process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://127.0.0.1:5000')
    : '';

  return makeRequest({
    url: `${baseUrl}/api/articles`,
    method: 'GET',
  });
};
