import { yupResolver } from "@hookform/resolvers/yup";
import {
    Box
} from "@mui/material";
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
import { Pagination } from "../pagination/Pagination";
import { CommentFrom } from "./comment-form/CommentForm";
import { Comments } from "./comments/Comments";
import { DeleteConfirmButton } from "./delete-confirm-button/DeleteConfirmButton";
import { commentSchema } from "./yup/yup";

export const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  const comments = useSelector(
    //@ts-ignore
    (state: RootState) => state.profile.comments.data
  );
  const currentUserEmail = useSelector(
    (state: RootState) => state.profile.email
  );

  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean | null>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [editedComments, setEditedComments] = useState<{
    [key: number]: boolean;
  }>({});
  const limit = 5;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(commentSchema),
  });

  const onSubmit = (data: { text: string }) => {
    const commentData = {
      text: data.text,
    };
    if (editId !== null) {
      dispatch(editCommentThunk({ id: editId, text: data.text }))
        .then(() => dispatch(fetchCommentsThunk({ page: currentPage, limit })))
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
      dispatch(commentThunk(commentData))
        .then(() => dispatch(fetchCommentsThunk({ page: currentPage, limit })))
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
      .then(() => dispatch(fetchCommentsThunk({ page: currentPage, limit })))
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

  useEffect(() => {
    const fetchData = async () => {
      const res = await dispatch(
        fetchCommentsThunk({ page: currentPage, limit })
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
    
  return (
    <Box sx={{ textAlign: "center", paddingTop: "80px" }}>
      <CommentFrom
        setEditId={setEditId}
        errors={errors}
        reset={reset}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        isFormOpen={isFormOpen}
        setIsFormOpen={setIsFormOpen}
        isAuth={isAuth}
        editId={editId}
      />
      <Comments
        setEditId={setEditId}
        errors={errors}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        editId={editId}
        setDeleteId={setDeleteId}
        onEdit={onEdit}
        editedComments={editedComments}
        comments={comments}
        currentUserEmail={currentUserEmail}
        isAuth={isAuth}
      />
      <Pagination
        comments={comments}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
      />
      <DeleteConfirmButton
        deleteId={deleteId}
        setDeleteId={setDeleteId}
        onDelete={onDelete}
      />
    </Box>
  );
};
