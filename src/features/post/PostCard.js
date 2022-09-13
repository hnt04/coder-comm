import React, { useState } from 'react';
import { Box, Link, Card, Stack, Avatar, Typography, CardHeader, IconButton} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../../utils/formatTime";
import PostReaction from './PostReaction';
import CommentList from '../comment/CommentList';
import CommentForm from '../comment/CommentForm';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PostDeleteConfirmation from './PostDeleteConfirm';
import PostFormUpdate from './PostFormUpdate';
import { Button, Modal } from "@mui/material";

function PostCard({ post }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // const onSubmit = async (data) => {
  //   dispatchEvent(updateUserProfile({ postId: post._id, ...data}));
  // }

  const menuId = "primary-option-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
      <Button onClick={handleShow}>
        <Modal show={show} onClose={handleClose}>
        <PostDeleteConfirmation /></Modal>
        Delete Post
      </Button>
      </MenuItem>

      <MenuItem>
      <Button onClick={handleShow}>
      <Modal show={show} onClose={handleClose}>
        <PostFormUpdate /></Modal>
        Edit Post
      </Button>
      </MenuItem>
    </Menu>
  );
  console.log("renderMenu",renderMenu)

  return (
     <Card>
      <CardHeader
        disableTypography
        avatar={
          <Avatar src={post?.author?.avatarUrl} alt={post?.author?.name} />
        }
        title={
          <Link
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
            sx={{ fontWeight: 600 }}
            to={`/user/${post.author._id}`}
          >
            {post?.author?.name}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {fDate(post.createdAt)}
          </Typography>
        }
        action={
          <Box onClick={handleProfileMenuOpen}>
          <IconButton >
            <MoreVertIcon sx={{ fontSize: 30 }} />
          </IconButton>
            </Box>
        }>
        </CardHeader>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography>{post.content}</Typography>

        {post.image && (
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              height: 300,
              "& img": { objectFit: "cover", width: 1, height: 1 },
            }}
          >
            <img src={post.image} alt="post" />
          </Box>
        )}

        <PostReaction post={post} />
        <CommentList postId={post._id} />
        <CommentForm postId={post._id} />
      </Stack>
      {renderMenu}
    </Card>
  );
}

export default PostCard;

