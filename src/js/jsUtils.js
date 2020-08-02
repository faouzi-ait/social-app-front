export const errorBorder = (touched, errors) => {
  return {
    border: touched && errors ? "1px solid red" : "1px solid black",
  };
};
