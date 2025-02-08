import * as yup from "yup";

export const commentSchema = yup.object().shape({
  text: yup
    .string()
    .trim()
    .required("Comment is required")
    .max(300, "The maximum length of the message is 300 characters"),
});
