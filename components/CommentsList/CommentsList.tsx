import React, { useEffect } from 'react';
import * as Styled from './CommentsList.styles';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Comment from '../Comment/Comment';
import Ticker from 'react-ticker';
import WindowLoaderSkeleton from '../WindowLoaderSkeleton/WindowLoaderSkeleton';
import ActionButton from '../Portfolio/ActionButton/ActionButton';
import { FiPenTool } from 'react-icons/fi';
import CommentsForm from '../CommentsForm/CommentsForm';

/**
 *Renders list of all approved comments
 *@function CommentsList
 *@returns {JSX.Element} - Rendered CommentsList component
 */
const CommentsList = (): JSX.Element => {
  const { loadAllApprovedComments, openWindow } = useActions();
  const { comments, isLoading } = useTypedSelector((state) => state.comments);
  const [tickerKey, setTickerKey] = React.useState(Date.now());

  useEffect(() => {
    loadAllApprovedComments();
    setTickerKey(Date.now());
  }, []);

  const handleLeaveComment = () => {
    openWindow({
      windowName: 'Comment',
      windowContent: <CommentsForm />,
      windowIcon: '/assets/icons/Desktop/acknowledgment.png',
      isOpen: true,
      size: {
        width: 0.75 * window.innerWidth,
        height: 0.7 * window.innerHeight,
      },
    });
  };

  const renderComments = () => (
    <Styled.UL>
      {comments.map((comment, index) => (
        <Styled.LI key={`${comment._id}-${index}`}>
          <Comment {...comment} />
        </Styled.LI>
      ))}
    </Styled.UL>
  );

  return (
    <Styled.Container>
      {isLoading ? (
        <WindowLoaderSkeleton />
      ) : (
        <Styled.Wrapper>
          <div key={`ticker-wrapper-${tickerKey}`}>
            {comments.length > 0 && (
              <Ticker direction="toRight" offset="run-in" speed={5} mode="smooth">
                {({ index }) => renderComments()}
              </Ticker>
            )}
          </div>
          <ActionButton
            onClick={handleLeaveComment}
            buttonText={'Leave your comment!'}
            icon={<FiPenTool className={'action-icon'} />}
          />
        </Styled.Wrapper>
      )}
    </Styled.Container>
  );
};

export default CommentsList;
