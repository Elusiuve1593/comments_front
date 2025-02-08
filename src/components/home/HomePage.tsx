import { yupResolver } from "@hookform/resolvers/yup";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ReplyIcon from "@mui/icons-material/Reply";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  commentThunk,
  deleteCommentThunk,
  editCommentThunk,
  fetchCommentsThunk,
  fetchProfileThunk,
} from "../../redux/slices/user/operations";
import { AppDispatch, RootState } from "../../redux/store";
import { commentSchema } from "./yup/yup";
import { style } from "../../common/styles/styles";
import toast from "react-hot-toast";
import { toZonedTime } from "date-fns-tz";

export const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  const comments = useSelector((state: RootState) => {
    //@ts-ignore
    return state.profile.comments.data;
  });

  console.log(comments);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(commentSchema),
  });

  useEffect(() => {
    if (!isAuth) {
      setIsFormOpen(false);
    }
  }, [isAuth]);

  useEffect(() => {
    dispatch(fetchProfileThunk());
  }, []);

  useEffect(() => {
    dispatch(fetchCommentsThunk());
  }, []);

  const onSubmit = (data: { text: string }) => {
    if (editId !== null) {
      dispatch(editCommentThunk({ id: editId, text: data.text }));
    } else {
      dispatch(commentThunk(data));
    }
    reset();
    setEditId(null);
    setIsFormOpen(false);
  };

  const onEdit = (id: number | null, text: string) => {
    setEditId(id);
    setValue("text", text);
    setIsFormOpen(true);
  };

  const onDelete = (id: number) => {
    dispatch(deleteCommentThunk(id));
    setDeleteId(null);
  };

  return (
    <Box sx={{ textAlign: "center", paddingTop: "80px" }}>
      {!isFormOpen ? (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setIsFormOpen(true)}
          disabled={!isAuth}
          sx={{ fontSize: "1rem", padding: "5px 10px", marginBottom: "20px" }}
        >
          {editId !== null ? "Edit Comment" : "Add Comment"}
        </Button>
      ) : (
        <Paper sx={{ padding: 2, maxWidth: 400, margin: "auto", mt: 2, mb: 3 }}>
          <Typography
            sx={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "primary.main",
              textAlign: "center",
              mb: 2,
            }}
          >
            {editId !== null ? "Edit Comment" : "Add Comment"}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Your comment"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              {...register("text")}
              error={!!errors.text}
              helperText={errors.text?.message}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
                mb: 3,
              }}
            >
              <Button
                sx={{ marginRight: 2 }}
                variant="outlined"
                onClick={() => {
                  reset();
                  setEditId(null);
                  setIsFormOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                {editId !== null ? "Save Changes" : "Post Comment"}
              </Button>
            </Box>
          </form>
        </Paper>
      )}

      {comments &&
        comments.map((el: any) => {
            const { id, text, createdAt, user, parentId } = el;
            console.log(createdAt)
          const date =
            createdAt &&
            format(
              toZonedTime(new Date(createdAt), "Europe/Kiev"),
              "dd.MM.yy HH:mm"
            );
          return (
            <Paper
              key={id}
              sx={{
                p: 2,
                mb: 2,
                display: "flex",
                flexDirection: "column",
                maxWidth: 500,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  minWidth: 350,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={user.avatar}
                    alt="Avatar"
                    width={30}
                    height={30}
                    style={{ borderRadius: "50%", marginRight: 10 }}
                  />
                  <Typography
                    sx={{ marginRight: "5px" }}
                    variant="caption"
                    color="textSecondary"
                  >
                    {user.username}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {date}
                  </Typography>
                </Box>
                <Box>
                  <IconButton
                    size="small"
                    onClick={() => {
                      if (isAuth) {
                        onEdit(id, text);
                      } else {
                        toast.error("Sign-in first, please", { style });
                      }
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => {
                      if (isAuth) {
                        setDeleteId(id);
                      } else {
                        toast.error("Sign-in first, please", { style });
                      }
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>

              <Typography sx={{ mt: 1, wordBreak: "break-word" }}>
                {text}
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => console.log("Reply to", parentId)}
                >
                  <ReplyIcon fontSize="small" />
                </IconButton>
              </Box>
            </Paper>
          );
        })}

      <Dialog open={deleteId !== null} onClose={() => setDeleteId(null)}>
        <DialogTitle>Are you sure you want to delete this comment?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => onDelete(deleteId as number)}
            color="secondary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
