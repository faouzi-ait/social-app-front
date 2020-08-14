import React from "react";
import { Formik, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../redux/actions/update_actions";
import Input from "../form-components/inputs/Input";
import { errorBorder } from "../../js/jsUtils";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import * as Yup from "yup";

let expression = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;

const validationSchema = Yup.object({
  bio: Yup.string().required("Bio is required"),
  location: Yup.string().required("Location is required"),
  website: Yup.string()
    .matches(RegExp(expression), "Please check your website address")
    .required("Please check your website"),
});

function FormDialog() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const { bio, location, website } = useSelector(
    (state) => state.user_profile.data.profile
  );

  const initialValues = {
    bio,
    location,
    website,
  };

  const onSubmit = ({ bio, location, website }) => {
    const payload = {
      bio,
      website,
      location,
    };
    dispatch(updateProfile(payload));
    setOpen(false);
  };

  return (
    <div>
      <div className="modal-btn">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setOpen(true)}
          maxWidth="false"
        >
          Edit your details
        </Button>
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className="modal-title-container">
          <span className="modal-title">Update your details</span>
        </DialogTitle>
        <DialogContent>
          <div className="login-layout">
            <div className="form-layout edit-layout">
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
                        label="Bio"
                        name="bio"
                        style={errorBorder(props.touched.bio, props.errors.bio)}
                        labelStyle="label-style edit-details"
                        className="input-style"
                      />
                    </div>
                    <div className="input-display">
                      <Input
                        control="input"
                        type="text"
                        label="Location"
                        name="location"
                        style={errorBorder(
                          props.touched.location,
                          props.errors.location
                        )}
                        labelStyle="label-style edit-details"
                        className="input-style"
                      />
                    </div>
                    <div className="input-display">
                      <Input
                        control="input"
                        type="text"
                        label="Website"
                        name="website"
                        style={errorBorder(
                          props.touched.website,
                          props.errors.website
                        )}
                        labelStyle="label-style edit-details"
                        className="input-style"
                      />
                    </div>
                    <DialogActions>
                      <Button
                        onClick={() => setOpen(false)}
                        color="primary"
                        style={{ fontSize: "1.25rem" }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        color="primary"
                        style={{ fontSize: "1.25rem" }}
                      >
                        Save
                      </Button>
                    </DialogActions>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default FormDialog;
