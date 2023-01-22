import { Container } from "@mui/material";
import { Stack } from "@mui/material";
import { Grid } from "@mui/material";
import { Box } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { Link } from "@mui/material";
import { useState } from "react";
import "../index.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ContextAPI } from "../context/contextAPI";
import { Alert } from "@mui/material";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);
    const [emailDoesNotMatch, setEmailDoesNotMatch] = useState(false);
    const [passwordDoesNotMatch, setPasswordDoesNotMatch] = useState(false);
    const cookies = new Cookies();
    const navigate = useNavigate();
    const { isRegistered } = useContext(ContextAPI); 

    const handleSubmit = (e) => {
        e.preventDefault();

        const configuration = {
            method: "post",
            url: "https://apitakenotes.onrender.com/user/login",
            data: {
                email,
                password
            }
        };

        if(email && password) {
            axios(configuration).then((result) => { 
                cookies.set("TOKEN", result.data.token, {
                    path: "/",
                });
                navigate("/home");
            }).catch((error) => { 
                if(error.response.status == 404) {
                    setEmailDoesNotMatch(true);
                } else if (error.response.status == 400) {
                    setPasswordDoesNotMatch(true);
                } else {
                    console.log(error.response.status);
                }
             });
        }
        setIsSubmit(true);
    };
    return (
        <Container>
            <Stack direction="column">
            {isRegistered && (
            <Stack direction="row" justifyContent="center" mt={5}>
                <Alert severity="success">Cadastro realizado com sucesso</Alert>
            </Stack>
            )}
            <Grid container justifyContent="center">
                <Box component="form" onSubmit={(e) => handleSubmit(e)} mt={isRegistered ? 3 : 12} sx={{
                    width: 500,
                    height: 330,
                    p: 5,
                    borderRadius: 2
                }}>
                <Stack direction="column" mt={3}>
                        <TextField sx={{ 
                            "& .MuiInputLabel-root.Mui-focused": { color: "#0f8092" } , "& .MuiOutlinedInput-root.Mui-focused": {
                                "& > fieldset": { borderColor: "#0f8092" } }
                         }} error={isSubmit && email === "" || (emailDoesNotMatch || passwordDoesNotMatch)} helperText={isSubmit && email  === "" ? "Digite seu email" : ""} id="loginEmail" label="Email" variant="outlined" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </Stack>
                <Stack direction="column" mt={3}>
                        <TextField sx={{
                            "& .MuiInputLabel-root.Mui-focused": { color: "#0f8092" } , "& .MuiOutlinedInput-root.Mui-focused": {
                                "& > fieldset": { borderColor: "#0f8092" } }
                        }} error={isSubmit && password === "" || (passwordDoesNotMatch || emailDoesNotMatch)} helperText={isSubmit && password === "" || (passwordDoesNotMatch || emailDoesNotMatch) ? (passwordDoesNotMatch || emailDoesNotMatch) ? "E-mail ou senha incorretos" : "Digite sua senha" : ""} id="loginPassword" label="Senha" type="password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Stack>
                <Stack direction="column" mt={3} spacing={15}>
                        <Button id="loginBtn" className="btn-register" sx={{
                                p: 1,
                                backgroundColor: "#0e899b",
                                "&:hover": { backgroundColor: "#0f8092" }
                            }} variant="contained" onClick={(e) => handleSubmit(e)} type="submit">Entrar</Button>
                </Stack>
                <Stack direction="column" mt={3}>
                    <Typography variant="subtitle3" gutterBottom>
                        Não possui cadastro? <Link href="/register" sx={{ color: "#0f8092", textDecoration: "none" }}>Cadastre-se</Link>.
                    </Typography>
                </Stack>    
                </Box>
            </Grid>
            </Stack>
        </Container>
    );
};