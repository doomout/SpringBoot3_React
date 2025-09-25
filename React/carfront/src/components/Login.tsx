import { useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import CarList from "./CarList";
import Snackbar from "@mui/material/Snackbar";

type User = {
    username: string;
    password: string;
}

function Login() {
    const [open, setOpen] = useState(false);

    const [user, setUser] = useState<User>({
        username: '',
        password: ''
    });
    
    const [isAuthenticated, setAuth] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [event.target.name] : event.target.value});
    }

    const handleLogin = () => {
        axios.post(import.meta.env.VITE_API_URL + "/login", user, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
            const jwtToken = res.headers.authorization;
            if(jwtToken !== null) {
                sessionStorage.setItem("jwt", jwtToken);
                setAuth(true);
            }
        })
        .catch(() => setOpen(true));
    }

    if(isAuthenticated) {
        return <CarList />
    }
    else {
        return (
            <Stack spacing={2} alignItems="center" mt={2}>
                <TextField 
                    name="username"
                    label="Username"
                    onChange={handleChange} />
                <TextField 
                    type="password"
                    name="password"
                    label="Password"
                    onChange={handleChange} />
                <Button 
                    variant="outlined"
                    color="primary"
                    onClick={handleLogin} >
                        Login
                </Button>
                <Snackbar 
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message="로그인 실패!"
                />
            </Stack>
        );
    }
}

export default Login;