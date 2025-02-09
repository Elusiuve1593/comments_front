import {
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface CommentsProps {
  comments: any;
  isAuth: boolean;
  currentUserEmail: string;
  editedComments: any;
  editId: number | null;
  setEditId: (edit: number | null) => void;
  onEdit: (id: number | null, text: string) => void;
  setDeleteId: (id: number | null) => void;
  handleSubmit: any;
  onSubmit: any;
  register: any;
  errors: any;
}

export const Comments = ({
  onSubmit,
  register,
  errors,
  handleSubmit,
  comments,
  setEditId,
  editId,
  isAuth,
  setDeleteId,
  currentUserEmail,
  editedComments,
  onEdit,
}: CommentsProps) => {
  return (
    <>
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
                  minHeight: 60,
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
            </Paper>
          );
        })}
    </>
  );
};
