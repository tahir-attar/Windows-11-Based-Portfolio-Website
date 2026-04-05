import {
  LikeAction,
  LikesActionTypes,
} from '../../types/redux/likes-reducer-types';
import { Dispatch } from 'redux';
import { getErrorMessage } from '../../utils/getErrorMessage';
import {
  getAllLikesFromDB,
  persistNewLikeToDB,
} from '../../frontend-rest-client/rest/likes';

export const getAllLikes = () => {
  return async (dispatch: Dispatch<LikeAction>): Promise<void> => {
    dispatch({ type: LikesActionTypes.LOAD_ALL_LIKES });
    try {
      const response = await getAllLikesFromDB();
      dispatch({
        type: LikesActionTypes.LIKES_DID_LOAD,
        payload: response.data.totalLikes || 0,
      });
    } catch (error) {
      dispatch({
        type: LikesActionTypes.LIKES_LOAD_ERROR,
        payload: getErrorMessage(error),
      });
    }
  };
};

export const postLike = () => {
  return async (dispatch: Dispatch<LikeAction>): Promise<void> => {
    dispatch({ type: LikesActionTypes.PERSIST_LIKE });
    try {
      await persistNewLikeToDB();

      dispatch({
        type: LikesActionTypes.LIKE_WAS_PERSISTED,
        payload: true,
      });

      const refreshResponse = await getAllLikesFromDB();
      dispatch({
        type: LikesActionTypes.LIKES_DID_LOAD,
        payload: refreshResponse.data.totalLikes || 0,
      });
    } catch (error) {
      dispatch({
        type: LikesActionTypes.LIKE_PERSIST_ERROR,
        payload: getErrorMessage(error),
      });
    }
  };
};

export const clearLikeState = () => {
  return async (dispatch: Dispatch<LikeAction>): Promise<void> => {
    dispatch({ type: LikesActionTypes.CLEAR_STATE });
  };
};
