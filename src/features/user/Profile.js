import { Grid, Stack } from "@mui/material";
import ProfileAbout from "./ProfileAbout";
import ProfileSocialInfo from "./ProfileSocialInfo";
import PostForm from "../post/PostForm";
import ProfileScorecard from "./ProfileScorecard";
import PostList from "../post/PostList";
import useAuth from "../../hooks/useAuth";

function Profile({ profile }) {
  console.log("profile 2", profile )
  const { user } = useAuth();
  return profile && (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
         <ProfileScorecard profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileSocialInfo profile={profile} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          {user?._id === profile?._id && <PostForm />}
          <PostList userId={profile?._id} />
        </Stack>
      </Grid>
    </Grid>
  );
}

export default Profile;
