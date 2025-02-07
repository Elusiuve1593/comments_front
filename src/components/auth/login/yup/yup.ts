import * as yup from "yup";

export const schema = yup.object().shape({
  email: yup
    .string()
    .required("Fill the field!")
    .email("Wrong format of mail!"),
  password: yup
    .string()
    .required("Fill the field!")
    .min(7, "Password should contain 7 symbols minimum!"),
});