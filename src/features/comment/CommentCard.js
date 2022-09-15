import React, { useState } from "react";
import { Avatar, Box, Button, Divider, Modal, Paper, Stack, Typography } from "@mui/material";
import { fDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteComment } from "./commentSlice";
import { useDispatch } from "react-redux";

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
  const [open, setOpen] = React.useState(false);
  const [chosenId, setChosenId] = useState(null);

  const dispatch = useDispatch();

  const handleChoose = (id)=> {
    setOpen(true)
      setChosenId(id)
  }

  const handleClose = () => setOpen(false);

  const handleDelete = (_id) => dispatch(deleteComment(comment._id))

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
          <Button onClick={()=> handleChoose(comment._id)}>
            <DeleteIcon />
            <Modal
              open={open}
              onClose={handleClose}>
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
              <Button variant="outlined" color="error" onClick={()=>handleDelete(chosenId)}>
                      Delete
              </Button>
            </Box>
          </Box>
          </Modal>
          </Button>
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