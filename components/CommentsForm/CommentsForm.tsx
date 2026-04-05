import React from 'react';
import * as Styled from './CommentsForm.styles';
import * as yup from 'yup';
import { Form, Formik, Field } from 'formik';
import FormikTextField from '../Portfolio/FormikTextField/FormikTextField';
import ActionButton from '../Portfolio/ActionButton/ActionButton';
import { FiSend, FiUser, FiMessageSquare } from 'react-icons/fi';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const validationSchema = yup.object({
  author: yup.string().required('Please introduce Yourself'),
  comment: yup.string().required('Please leave your comment'),
  gender: yup.string().oneOf(['male', 'female']).required('Please select your gender'),
});

/**
 *Renders form where user can submit a comment
 *@function CommentsForm
 *@returns {JSX.Element} - Rendered CardContent component
 */
const CommentsForm = (): JSX.Element => {
  const { isLoading, isCommentPersisted, error } = useTypedSelector(
    (state) => state.comments
  );
  const { uploadNewComment } = useActions();

  return (
    <Styled.Container isCommentPersisted={isCommentPersisted}>
      <Styled.TextWrapper>
        <Styled.Message>
          {isCommentPersisted
            ? '🎉 Thanks! 🎉'
            : '👋 Hey! I hope you liked the project 😉'}
        </Styled.Message>
        <Styled.Text>
          {isCommentPersisted
            ? `Your comment will be added to the list in no time 🙌`
            : 'If you really enjoyed this experience. Consider leaving a comment!'}
        </Styled.Text>
      </Styled.TextWrapper>

      <Formik
        initialValues={{ author: '', comment: '', gender: 'male' }}
        validationSchema={validationSchema}
        onSubmit={async (data) => {
          uploadNewComment(data as any);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Styled.InputGroup>
              <FiUser />
              <FormikTextField placeholder="Your Name" name="author" type="text" />
            </Styled.InputGroup>

            <Styled.InputGroup>
              <FiMessageSquare />
              <FormikTextField placeholder="Your Comment" name="comment" type="text" />
            </Styled.InputGroup>

            <Styled.GenderGroup>
              <label>
                <Field type="radio" name="gender" value="male" />
                Male
              </label>
              <label>
                <Field type="radio" name="gender" value="female" />
                Female
              </label>
            </Styled.GenderGroup>
            {errors.gender && touched.gender && <Styled.Error>{errors.gender}</Styled.Error>}
            {error && <Styled.Error>{error}</Styled.Error>}

            <ActionButton
              buttonText={isCommentPersisted ? '🙌 Thanks 💫' : 'Shoot'}
              icon={<FiSend className={'action-icon'} />}
              isLoading={isLoading}
              disabled={isCommentPersisted}
              type="submit"
            />
          </Form>
        )}
      </Formik>
    </Styled.Container>
  );
};

export default CommentsForm;
