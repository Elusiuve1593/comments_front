import { Box, Button, Paper, TextField, Typography } from "@mui/material";

interface CommentFromProps {
  setIsFormOpen: (isFormOpen: boolean) => void;
  isFormOpen: boolean | null;
  isAuth: boolean;
  editId: number | null;
  setEditId: (edit: number | null) => void;
  handleSubmit: any;
  onSubmit: any;
  register: any;
  errors: any;
  reset: any;
}

export const CommentFrom = ({
  isFormOpen,
  setIsFormOpen,
  isAuth,
  editId,
  handleSubmit,
  register,
  onSubmit,
  errors,
  reset,
  setEditId,
}: CommentFromProps) => {
  return (
    <>
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
    </>
  );
};
