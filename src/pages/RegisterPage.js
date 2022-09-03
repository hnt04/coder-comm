import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { FormProvider, FTextField } from "../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Alert, Container, Stack, Link, InputAdornment, IconButton } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from '@mui/lab';

const RegisterSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    passwordConfirm: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Password must match"),
});

const defaultValue = {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
}

function RegisterPage() {
    const auth = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const methods = useForm({
        resolver: yupResolver(RegisterSchema),
        defaultValue,
    });

    const {
        handleSubmit,
        reset,
        setError,
        formState: { errors, isSubmitting },
    } = methods;

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        let { name, email, password } = data;
        console.log("submit",name);
        try {
            await auth.register({ name, email, password}, () => {
                navigate("/", { replace: true });
            })
        } catch (error) {
            reset();
            setError("responseError", error)
        }
    }

  return (
    <Container maxWidth="xs">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                {!!errors.responseError && (
                    <Alert severity='error'>{errors.responseError.message}</Alert>
                )}
                <Alert severity='info'>Are you have an account?{" "}
                    <Link variant="subtitle2" component={RouterLink} to="/login">Sign in
                    </Link>
                </Alert>

                <FTextField name="name" label="Your Full name" />
                <FTextField name="email" label="Email address" />

                <FTextField
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end">
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}>
                </FTextField>

                <FTextField
                    name="passwordConfirmation"
                    label="Password Confirmation"
                    type={showPassword ? "text" : "passwordConfirmation"}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                    edge="end">
                                        {showPasswordConfirmation ? ( <VisibilityIcon /> ) : ( <VisibilityOffIcon /> )}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}>
                </FTextField>
            
                <LoadingButton
                    fulWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    >
                        Register
                </LoadingButton>
                <button type="submit">submit</button>
            </Stack>
        </FormProvider>
    </Container>
  );
}

export default RegisterPage;
