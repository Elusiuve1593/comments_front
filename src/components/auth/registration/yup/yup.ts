import * as yup from "yup";

export const schema = yup.object().shape({
  username: yup
    .string()
    .required("Fill the field!")
    .max(10, "First name must be at most 10 characters"),
  email: yup
    .string()
    .required("Fill the field!")
    .email("Wrong format of mail!")
    .max(20, "20 chars are maximum value for email"),
  password: yup
    .string()
    .required("Fill the field!")
    .min(7, "Password should contain 7 symbols minimum!")
    .max(14, "Password must be at most 14 characters"),
});
