import catchErrors from '../../middleware/catchErrors';
import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import axios from 'axios';

export { sendEmail };

/**
 * Send email via web3forms
 * @POST /api/contact
 * @function sendEmail
 */
const sendEmail = catchErrors(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const { name, email, message } = req.body;

    const access_key = process.env.WEB3FORMS_ACCESS_KEY || 'fff7f029-09c3-4a3b-863e-13b93c0f450f';

    const response = await axios.post(
      'https://api.web3forms.com/submit',
      {
        access_key,
        name,
        email,
        message,
        subject: `Message from ${name} via Portfolio`,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );

    res.status(StatusCodes.OK).json({
      success: true,
    });
  }
);
