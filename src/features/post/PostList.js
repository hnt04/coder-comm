import React, { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import PostCard from "./PostCard";
import { getPosts } from "./postSlice";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PostFormUpdate from "./PostFormUpdate";
import { deletePost } from './postSlice';
import { updatedPostProfile } from "./postSlice";
import { Button, Modal } from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function PostList({ userId, id }) {
  const [page, setPage] = useState(1);
  const { currentPagePosts, postsById, isLoading, totalPosts } = useSelector(
    (state) => state.post
  );
  const posts = currentPagePosts.map((postId) => postsById[postId]);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [chosenId, setChosenId] = useState(null);
  const [chosenPost, setChosenPost] = useState(null)
  const handleChoose = (id)=> {
      setOpen(true)
      setChosenId(id)
  }

  const handleChooseEdit = (post)=> {
      setOpenEdit(true)
      setChosenPost(post)
  }

  const handleClose = () => setOpen(false);
  const handleCloseEdit = () => setOpenEdit(false);
  
  const handleDelete = (id) => dispatch(deletePost(id))
  const handleEdit = (post) => dispatch(updatedPostProfile(post))

  useEffect(() => {
    if (userId) dispatch(getPosts({ userId, page }));
  }, [dispatch, userId, page]);

  return (
    <>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} handleChoose={handleChoose} handleChooseEdit={handleChooseEdit} />
      ))}
      <Modal
        open={open}
        onClose={handleClose}>
        <Box sx={style}>
        <Typography variant="h5" textAlign="center">Delete Post</Typography>
            
        <Typography textAlign="center" sx={{marginTop: "10px", marginBottom: "10px"}}>Do you want to <b>delete</b> this post?</Typography>

        <Box
          direction="row" spacing={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop:"15px",
            }}
          >
          <Button variant="outlined" color="error" onClick={()=>handleDelete(chosenId)}>
                  Delete
          </Button>
        </Box>
      </Box>
      </Modal>
      <Modal
        open={openEdit} 
        onClose={handleCloseEdit} 
        >
          <PostFormUpdate onClose={handleCloseEdit}  post={chosenPost} handleEdit={handleEdit}/>
      </Modal>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {totalPosts ? (
          <LoadingButton
            variant="outlined"
            size="small"
            loading={isLoading}
            onClick={() => setPage((page) => page + 1)}
            disabled={Boolean(totalPosts) && posts.length >= totalPosts}
          >
            Load more
          </LoadingButton>
        ) : (
          <Typography variant="h6">No Post Yet</Typography>
        )}
      </Box>
    </>
  );
}

export default PostList;