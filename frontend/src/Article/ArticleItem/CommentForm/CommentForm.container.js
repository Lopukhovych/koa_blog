import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {updateFormControlsHandler} from 'src/core/formHandler.helper';
import CommentFormView from 'src/Article/ArticleItem/CommentForm/CommentForm.view';
import {saveComment} from './redux/actions';

const initialCommentFormControls = {
  comment: {
    elementType: 'textarea',
    elementConfig: {
      type: 'textarea',
      placeholder: 'Enter your comment',
      resize: 'none',
    },
    value: '',
    validation: {
      maxLength: 200,
    },
    valid: false,
    errorMessage: 'Max length is 200 symbols',
    touched: false,
  },
};


const CommentFormContainer = ({
  saveComment, userId, articleId, success, error,
}) => {
  const [commentForm, updateCommentForm] = useState({
    controls: {...initialCommentFormControls},
    formIsValid: false,
  });
  const [formError, updateFormError] = useState(null);

  useEffect(() => {
    updateFormError(error);
  }, [error]);

  useEffect(() => {
    if (success) {
      updateCommentForm({
        controls: {...initialCommentFormControls},
        formIsValid: false,
      });
    }
  }, [success]);

  const changeFormValueHandler = (value, controlName) => {
    updateCommentForm(updateFormControlsHandler(value, controlName, commentForm.controls));
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    const {controls, formIsValid} = commentForm;
    if (formIsValid) {
      const commentValues = {};
      Object.keys(controls).forEach((key) => {
        commentValues[key] = controls[key].value;
      });
      saveComment({
        postId: articleId,
        comment: commentValues.comment,
        userId,
      });
    }
  };
  return (
    <CommentFormView
      changeFormValueHandler={changeFormValueHandler}
      submitFormHandler={submitFormHandler}
      controls={commentForm.controls}
      formIsValid={commentForm.formIsValid}
      errorMessage={formError && formError.message}
    />
  );
};

const mapStateToProps = ({userData, articleCommentForm: {pending, success, error}}) => ({
  userId: userData.userData && userData.userData.id,
  pending,
  success,
  error,
});

const mapDispatchToProps = {
  saveComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentFormContainer);
