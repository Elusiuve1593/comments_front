import { Box, Button, Typography } from "@mui/material";

interface PaginationProps {
  comments: any;
  handlePageChange: (page: number) => void;
  currentPage: number;
  totalPages: number;
}

export const Pagination = ({
  comments,
  handlePageChange,
  currentPage,
  totalPages,
}: PaginationProps) => {
  return (
    <>
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
    </>
  );
};
