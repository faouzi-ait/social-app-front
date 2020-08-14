import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { createScreem } from "../../redux/actions/screems";
import { Formik, Form } from "formik";
import { errorBorder } from "../../js/jsUtils";
import { FiXCircle } from "react-icons/fi";
import Input from "../form-components/inputs/Input";
import * as Yup from "yup";

const CommentContainer = styled.div`
  display: flex;
  position: absolute;
  width: 100vw;
  min-height: calc(100vh - 5rem);
  background: lightgrey;
  justify-content: center;
  align-items: center;
  border: 1px solid grey;
  z-index: 9999;
  opacity: 0.85;
`;

const CommentBox = styled.div`
  padding: 2rem;
  width: 25vw;
  min-height: 20vh;
  border-radius: 5px;
  border: 1px solid grey;
  background: #fff;
`;

const CommentBoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CommentBoxTitle = styled.h4`
  margin: 0;
  padding: 0;
  font-size: 2rem;
`;

const CommentBoxCloseBtn = styled.span`
  font-size: 2rem;
  cursor: pointer;
`;

const initialValues = {
  body: "",
};

const validationSchema = Yup.object({
  body: Yup.string().required("Hey!! Don't forget your post!"),
});

function AddNewComment({ setOpen }) {
  const dispatch = useDispatch();

  const onSubmit = ({ body }) => {
    const payload = {
      body,
    };
    dispatch(createScreem(payload));
  };

  return (
    <CommentContainer>
      <CommentBox>
        <CommentBoxHeader>
          <CommentBoxTitle>What are you up to today?</CommentBoxTitle>
          <CommentBoxCloseBtn onClick={() => setOpen(false)}>
            <FiXCircle />
          </CommentBoxCloseBtn>
        </CommentBoxHeader>

        <div className="login-layout">
          <div className="form-layout-comment">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(props) => (
                <Form autoComplete="off">
                  <div className="input-display">
                    <Input
                      control="input"
                      type="text"
                      name="body"
                      style={errorBorder(props.touched.body, props.errors.body)}
                      labelStyle="label-style"
                      className="input-style"
                    />
                  </div>
                  <button
                    type="submit"
                    className="submit-style"
                    style={{
                      display: "inline-block",
                      marginRight: "1rem",
                    }}
                  >
                    post
                  </button>
                  <span
                    style={{
                      display: "inline-block",
                      color: "red",
                    }}
                  >
                    {/* {errors && "Login failed, please try again"} */}
                  </span>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </CommentBox>
    </CommentContainer>
  );
}

export default AddNewComment;
