import React, { useEffect } from 'react';
import styled from 'styled-components';

import { Formik, Form } from 'formik';
import Input from '../form-components/inputs/Input';
import * as Yup from 'yup';

import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getScreemDetails,
  setScreemDetailsReset,
  postComment,
} from '../../redux/actions/screems_actions';
import ScreemDetailLayout from './ScreemDetailLayout';
import CancelIcon from '@material-ui/icons/Cancel';

import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const initialValues = {
  Body: '',
};

const validationSchema = Yup.object({
  Body: Yup.string().required('Body is required').min(2),
});

function ScreemDetails() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { screem, user, comments } = useSelector(
    (state) => state.screems_details.screem
  );

  const isDetailsLoading = useSelector(
    (state) => state.screems_details_loading
  );

  useEffect(() => {
    dispatch(getScreemDetails(location.state));

    return () => {
      dispatch(setScreemDetailsReset());
    };
  }, [dispatch, location.state]);

  const ScreemDetailBoxContent = styled.div`
    display: flex;
    padding: 1rem;
  `;

  const ImageBox = styled.div`
    display: flex;
    justify-content: center;
    width: 25%;
    object-fit: contain;

    & > img {
      width: 100%;
      border-radius: 50%;
    }
  `;

  const UserContentData = styled.div`
    width: 65%;
  `;

  const ScreemInfo = ({ screem, user, card_style }) => {
    return (
      <div className={`${card_style} info--content`}>
        <span>
          {user && user.firstname} {user && user.lastname}
        </span>
        <span>Published: {screem && screem.createdAt.split('T')[0]}</span>
        <span style={{ paddingTop: '1rem' }}>{screem && screem.body}</span>
      </div>
    );
  };

  const ScreemComments = ({ comments }) => {
    return (
      <div style={{ padding: '0 2rem' }}>
        <div className="screem_comments">
          {comments &&
            comments.map((comment, i) => (
              <div className="comment_container">
                <img
                  src={comment.emetter.imageUrl}
                  alt="user"
                  className="screem_comments--user"
                />
                <div className="screem-details" key={i}>
                  <span>{comment.body}</span>
                  <span style={{ fontSize: '1rem' }}>
                    Posted on the: {comment.createdAt.split('T')[0]}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  };

  const onSubmit = ({ Body }) => {
    const payload = {
      body: Body,
    };
    dispatch(postComment(location.state, payload));
  };

  return (
    <ScreemDetailLayout>
      {!isDetailsLoading && screem && user && comments ? (
        <>
          <ScreemDetailBoxContent>
            <ImageBox>
              <img src={user?.imageUrl} alt="user" />
            </ImageBox>
            <UserContentData>
              {screem && (
                <ScreemInfo
                  user={user}
                  screem={screem}
                  card_style="cards--info"
                />
              )}
            </UserContentData>
            <span className="close-btn" onClick={() => history.push(`/home`)}>
              <CancelIcon fontSize="large" />
            </span>
          </ScreemDetailBoxContent>
          <div className="comment__form-layout">
            <div className="comment__form-content">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                {(formik) => (
                  <Form autoComplete="off">
                    <div className="new__comment">
                      <Input
                        control="input"
                        type="text"
                        name="Body"
                        className={`input-style new__comment--input ${
                          formik.touched.Body && formik.errors.Body
                            ? 'field-error'
                            : 'field-valid'
                        }`}
                        placeholder="Post a comment here"
                      />
                      <button
                        type="submit"
                        className="new__comment--submit"
                        disabled={formik.isSubmitting}>
                        Submit
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <ScreemComments comments={comments} />
        </>
      ) : (
        <ScreemDetailBoxContent>
          <div className={classes.root}>
            <LinearProgress />
          </div>
        </ScreemDetailBoxContent>
      )}
    </ScreemDetailLayout>
  );
}

export default ScreemDetails;
