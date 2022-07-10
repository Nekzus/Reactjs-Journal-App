import { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import {
    Alert,
    Button,
    Grid,
    Link,
    TextField,
    Typography,
} from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import {
    startGoogleSignIn,
    startLoginWithEmailPassword,
} from '../../store/auth';
import { useDispatch, useSelector } from 'react-redux';

const formData = {
    email: '',
    password: '',
};

const formValidations = {
    email: [value => value.includes('@'), 'El correo debe de tener una @'],
    password: [
        value => value.length >= 6,
        'La contraseña debe de tener al menos 6 caracteres',
    ],
};

export const LoginPage = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const { status, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const {
        email,
        password,
        onInputChange,
        formState,
        isFormValid,
        emailValid,
        passwordValid,
    } = useForm(formData, formValidations);

    const isAutenticating = useMemo(() => status === 'checking', [status]);

    const onSubmit = e => {
        e.preventDefault();
        setFormSubmitted(true);
        if (!isFormValid) return;
        dispatch(startLoginWithEmailPassword(formState));
    };

    const onGoogleSignIn = () => {
        dispatch(startGoogleSignIn());
    };

    return (
        <AuthLayout title="Login">
            <form
                className="animate__animated animate__fadeIn animate__faster"
                onSubmit={onSubmit}
            >
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        sx={{ mt: 2 }}
                    >
                        <TextField
                            label="Correo"
                            type="email"
                            placeholder="correo@google.com"
                            fullWidth
                            name="email"
                            value={email}
                            onChange={onInputChange}
                            error={!!emailValid && formSubmitted}
                            helperText={emailValid}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sx={{ mt: 2 }}
                    >
                        <TextField
                            label="Contraseña"
                            type="password"
                            placeholder="Contraseña"
                            fullWidth
                            name="password"
                            value={password}
                            onChange={onInputChange}
                            error={!!passwordValid && formSubmitted}
                            helperText={passwordValid}
                        />
                    </Grid>
                    <Grid
                        container
                        spacing={2}
                        sx={{ mb: 2, mt: 1 }}
                    >
                        <Grid
                            container
                            display={!!errorMessage ? '' : 'none'}
                            sx={{ mt: 1 }}
                        >
                            <Grid
                                item
                                xs={12}
                            >
                                <Alert severity="error">{errorMessage}</Alert>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={6}
                        >
                            <Button
                                disabled={isAutenticating}
                                type="submit"
                                variant="contained"
                                fullWidth
                            >
                                Login
                            </Button>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={6}
                        >
                            <Button
                                disabled={isAutenticating}
                                variant="contained"
                                fullWidth
                                onClick={onGoogleSignIn}
                            >
                                <Google />
                                <Typography sx={{ ml: 1 }}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="end"
                    >
                        <Link
                            component={RouterLink}
                            color="inherit"
                            to="/auth/register"
                        >
                            Crear una cuenta
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    );
};
