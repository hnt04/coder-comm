
import React, { useState } from 'react'
import { Button, Box, Typography } from "@mui/material";
import { deletePost } from './postSlice';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const PostDeleteConfirmation = () => {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const { id } = useParams();

    const handleCloseDelete = () => setShow(false);

    return(
      <Box closeButton>
        <Typography variant="h5">Delete Post</Typography>
            
        <Typography>Do you want to <b>delete</b> this post?</Typography>

        <Button variant="outlined" onClick={handleCloseDelete}>
                Cancel
        </Button>
        <Button variant="outlined" color="error" onClick={() => dispatch(deletePost(id))}>
                Delete
        </Button>
      </Box>
    )
}

export default PostDeleteConfirmation;
