import React, { useCallback } from "react";
import { Box, Stack, alpha } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { updatedPostProfile } from "./postSlice";
// import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, FTextField } from "../../components/form";
import FUploadImage from "../../components/form/FUploadImage";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const UpdateFormSchema = yup.object().shape({
  name: yup.string().required("Content is required"),
});

function PostFormUpdate({ post }) {
  const isLoading = useSelector((state) => state.user.isLoading);

  const defaultValues = {
    content: post.content, 
    image: post.url,
  };

  const methods = useForm({
    resolver: yupResolver(UpdateFormSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "imageUrl",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const onSubmit = (data) => {
    dispatch(updatedPostProfile({ postId: post._id, ...data }));
  };

  const handleEdit = (post) => dispatch(updatedPostProfile(post))

  const [openEdit, setOpenEdit] = React.useState(false);

  // const handleClose = () => setOpen(false);

  return (  
    <Box sx={style}>
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} onClick={()=>handleEdit(post)}>
        <Stack spacing={2}>
          <FTextField
            name="content"
            multiline
            fullWidth
            rows={4}
            sx={{
              "& fieldset": {
                borderWidth: `1px !important`,
                borderColor: alpha("#919EAB", 0.32),
              },
            }}
          />

          <FUploadImage
            name="image"
            accept="image/*"
            maxSize={3145728}
            onDrop={handleDrop}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              size="small"
              loading={isSubmitting || isLoading}
            >
              Save Post
            </LoadingButton>
          </Box>
        </Stack>
      </FormProvider>
      </Box>
  );
}

export default PostFormUpdate;