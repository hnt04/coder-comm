import React from 'react';
import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";

function BlankLayout() {
  return (
    <Stack minHeight="100vh" justifyContent="center" alignItem="center">
        <Logo sx={{ marginLeft: "45%", width: 90, height: 90, mb: 5 }}/>
        <Outlet />
    </Stack>
  );
}

export default BlankLayout;
