import { Dispatch } from 'redux';
import {
  CommentAction,
  CommentActionTypes,
} from '../../types/redux/comments-reducer-types';
import { getErrorMessage } from '../../utils/getErrorMessage';

/**
 * Load all comments via API route (server-side Firebase Admin)
 */
export const loadAllApprovedComments = () => {
  return async (dispatch: Dispatch<CommentAction>): Promise<void> => {
    dispatch({ type: CommentActionTypes.LOAD_ALL_COMMENTS });
    try {
      const res = await fetch('/api/comments');
      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      dispatch({
        type: CommentActionTypes.COMMENTS_DID_LOAD,
        payload: {
          total: data.total,
          comments: data.comments,
        },
      });
    } catch (error) {
      dispatch({
        type: CommentActionTypes.COMMENTS_LOAD_ERROR,
        payload: getErrorMessage(error),
      });
    }
  };
};

/**
 * Post a new comment via API route (server-side Firebase Admin)
 */
export const uploadNewComment = (newComment: {
  author: string;
  comment: string;
  gender: string;
}) => {
  return async (dispatch: Dispatch<CommentAction>): Promise<void> => {
    dispatch({ type: CommentActionTypes.PERSIST_COMMENT });
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment),
      });
      const data = await res.json();

      if (!data.success) {
        dispatch({
          type: CommentActionTypes.COMMENT_PERSIST_ERROR,
          payload: data.message,
        });
        return;
      }

      dispatch({
        type: CommentActionTypes.COMMENT_WAS_PERSISTED,
        payload: true,
      });
    } catch (error) {
      dispatch({
        type: CommentActionTypes.COMMENT_PERSIST_ERROR,
        payload: getErrorMessage(error),
      });
    }
  };
};
