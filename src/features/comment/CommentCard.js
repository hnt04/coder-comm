import React, { useState } from "react";
import { Avatar, Box, Button, Divider, Modal, Paper, Stack, Typography } from "@mui/material";
import { fDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteComment } from "./commentSlice";
import { useDispatch } from "react-redux";
import CommentDeleteConfirmation from "./CommentDeleteConfirm";

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

function CommentCard({ comment }) {
  const [openComment, setOpenComment] = React.useState(false);
  const [chosenIdComment, setChosenIdComment] = useState(null);

  const dispatch = useDispatch();

  const handleChooseComment = (id)=> {
    setOpenComment(true)
      setChosenIdComment(id)
  }

  const handleCloseComment = () => setOpenComment(false);

  const handleDeleteComment = (id) => dispatch(deleteComment(id))

  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
      <Paper sx={{ p: 1.5, flexGrow: 1, backgroundColor: "background.neutral" }}>
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment.author?.name}
          </Typography>
          <Button onClick={()=> handleChooseComment(comment._id)}>
            <DeleteIcon /></Button>
            <Modal
              open={openComment}
              onClose={handleCloseComment}>
            <Box sx={style}>
            <Typography variant="h5" textAlign="center">Delete Comment</Typography>
                
            <Typography textAlign="center" sx={{marginTop: "10px", marginBottom: "10px"}}>Do you want to <b>delete</b> this comment?</Typography>

            <Box
              direction="row" spacing={2}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop:"15px",
                }}
              >
              <Button variant="outlined" color="error" onClick={()=>handleDeleteComment(chosenIdComment)}>
                      Delete
              </Button>
            </Box>
            </Box>
            </Modal>
            
        </Stack>
        <Typography variant="caption" sx={{ color: "text.disabled" }}>
            {fDate(comment.createdAt)}
        </Typography>
        <Divider />
        <Typography variant="body2" sx={{ paddingTop: "20px", color: "text.secondary" }}>
          {comment.content}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CommentReaction comment={comment} />
        </Box>
      </Paper>
    </Stack>
  );
}

export default CommentCard;