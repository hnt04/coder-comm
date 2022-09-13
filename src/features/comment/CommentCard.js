import React from "react";
import { Avatar, Box, Divider, IconButton, Paper, Stack, Typography } from "@mui/material";
import { fDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";
import DeleteIcon from '@mui/icons-material/Delete';

function CommentCard({ comment }) {
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
          <IconButton>
            <DeleteIcon />
          </IconButton>
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