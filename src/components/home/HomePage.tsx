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
import { toZonedTime } from "date-fns-tz";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  commentThunk,
  deleteCommentThunk,
  editCommentThunk,
  fetchCommentsThunk,
} from "../../redux/slices/user/operations";
import { AppDispatch, RootState } from "../../redux/store";
import { commentSchema } from "./yup/yup";

export const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean | null>(false);
  const [editedComments, setEditedComments] = useState<{
    [key: number]: boolean;
  }>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  const comments = useSelector(
    //@ts-ignore
    (state: RootState) => state.profile.comments.data
  );
  const currentUserEmail = useSelector(
    (state: RootState) => state.profile.email
  );

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
    const fetchData = async () => {
      const res = await dispatch(
        fetchCommentsThunk({ page: currentPage, limit: 5 })
      );
      if (res.payload) {
        //@ts-ignore
        setTotalPages(res.payload.data.totalPages);
      }
    };
    fetchData();
  }, [currentPage, dispatch]);

  useEffect(() => {
    const storedEditedComments = JSON.parse(
      localStorage.getItem("editedComments") || "{}"
    );
    setEditedComments(storedEditedComments);
  }, []);

  const onSubmit = (data: { text: string }) => {
    if (editId !== null) {
      dispatch(editCommentThunk({ id: editId, text: data.text }))
        .then(() =>
          dispatch(fetchCommentsThunk({ page: currentPage, limit: 5 }))
        )
        .then((res) => {
          //@ts-ignore
          setTotalPages(res.payload.data.totalPages);
        });

      
      setEditedComments((prev) => {
        const updated = { ...prev, [editId]: true };
        localStorage.setItem("editedComments", JSON.stringify(updated));
        return updated;
      });

      setEditId(null);
    } else {
      dispatch(commentThunk(data))
        .then(() =>
          dispatch(fetchCommentsThunk({ page: currentPage, limit: 5 }))
        )
        .then((res) => {
          //@ts-ignore
          setTotalPages(res.payload.data.totalPages);
        });
    }
    reset();
    setIsFormOpen(false);
  };

  const onEdit = (id: number | null, text: string) => {
    setEditId(id);
    setValue("text", text);
  };

  const onDelete = (id: number) => {
    dispatch(deleteCommentThunk(id))
      .then(() => dispatch(fetchCommentsThunk({ page: currentPage, limit: 5 })))
      .then((res) => {
        //@ts-ignore
        const newTotalPages = res.payload.data.totalPages;
        setTotalPages(newTotalPages);
        if (currentPage > newTotalPages) {
          setCurrentPage(newTotalPages);
        }
      });
    setDeleteId(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
          const { id, text, createdAt, user } = el;
          const isCurrentUser = isAuth && currentUserEmail === user.email;
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
                    sx={{ marginRight: "5px", fontWeight: "bold" }}
                    variant="caption"
                    color="#000"
                  >
                    {user.username}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {date}
                    {editedComments[id] && (
                      <Typography variant="caption" color="textSecondary">
                        {" "}
                        (edited)
                      </Typography>
                    )}
                  </Typography>
                </Box>

                {isCurrentUser && (
                  <Box>
                    <IconButton size="small" onClick={() => onEdit(id, text)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => setDeleteId(id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                )}
              </Box>

              {editId === id ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    {...register("text")}
                    error={!!errors.text}
                    helperText={errors.text?.message}
                    sx={{ mt: 1 }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 1,
                    }}
                  >
                    <Button variant="outlined" onClick={() => setEditId(null)}>
                      Cancel
                    </Button>
                    <Button variant="contained" color="primary" type="submit">
                      Save Changes
                    </Button>
                  </Box>
                </form>
              ) : (
                <Typography sx={{ mt: 1, wordBreak: "break-word" }}>
                  {text}
                </Typography>
              )}

              {isAuth && (
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}
                >
                  <IconButton
                    size="small"
                    onClick={() => console.log("Reply to", id)}
                  >
                    <ReplyIcon fontSize="small" />
                  </IconButton>
                </Box>
              )}
            </Paper>
          );
        })}

      {comments && comments.length > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 3,
            gap: 2,
          }}
        >
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            sx={{
              padding: "6px 12px",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: 2,
              backgroundColor: currentPage === 1 ? "grey.300" : "primary.main",
              color: currentPage === 1 ? "text.secondary" : "white",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            Prev
          </Button>
          <Typography sx={{ fontSize: "1rem", fontWeight: "500" }}>
            Page {currentPage} of {totalPages}
          </Typography>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            sx={{
              padding: "6px 12px",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: 2,
              backgroundColor:
                currentPage === totalPages ? "grey.300" : "primary.main",
              color: currentPage === totalPages ? "text.secondary" : "white",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            Next
          </Button>
        </Box>
      )}

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
