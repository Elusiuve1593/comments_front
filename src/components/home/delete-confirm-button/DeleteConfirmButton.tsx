import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

interface DeleteConfirmButtonProps {
  deleteId: number | null;
  setDeleteId: (id: number | null) => void;
  onDelete: (id: number) => void;
}

export const DeleteConfirmButton = ({
  deleteId,
  setDeleteId,
  onDelete,
}: DeleteConfirmButtonProps) => {
  return (
    <>
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
    </>
  );
};
