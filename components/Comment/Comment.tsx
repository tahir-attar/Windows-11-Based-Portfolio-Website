import React, { useMemo } from 'react';
import * as Styled from './Comment.styles';
import { IComment } from '../../types/redux/comments-reducer-types';
import Image from 'next/image';

/**
 *@function Comment
 *@param {string} author - author name
 *@param {string} comment - comment text itself
 *@param {string} createdAt - timestamp where comment was written
 *@returns {JSX.Element} - Rendered CardContent component
 */
const Comment = ({ comment, createdAt, author, gender, _id }: IComment): JSX.Element => {
  const avatarId = useMemo(() => {
    // Deterministic random based on _id string
    const seed = _id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Explicitly define pools
    const femaleAvatars = [3, 4, 10, 11, 12, 13, 14];
    const maleAvatars = [1, 2, 5, 6, 7, 8, 9];

    if (gender === 'female') {
        const id = femaleAvatars[seed % femaleAvatars.length];
        return `/assets/avatars/female/${id}.png`;
    } else {
        const id = maleAvatars[seed % maleAvatars.length];
        return `/assets/avatars/${id}.png`;
    }
  }, [gender, _id]);

  return (
    <Styled.Container>
      <Styled.Figure>
        <Styled.Date>
          {createdAt && !isNaN(Date.parse(createdAt))
            ? new Date(createdAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : 'Recently'}
        </Styled.Date>

        <Image
          src={avatarId}
          width={150}
          height={150}
          objectFit={'contain'}
          alt={author}
        />
        <Styled.Figcaption>
          <Styled.Name>{author}</Styled.Name>
        </Styled.Figcaption>
      </Styled.Figure>

      <Styled.CommentWrapper>
        <Styled.Text>{comment}</Styled.Text>
      </Styled.CommentWrapper>
    </Styled.Container>
  );
};
export default Comment;
