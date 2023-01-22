import { Container } from "@mui/material";
import { Stack } from "@mui/material";
import { Grid } from "@mui/material";
import { Box } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { Link } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { useContext } from "react";
import { ContextAPI } from "../context/contextAPI";

export const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);
    const [userAlreadyExists, setUserAlreadyExists] = useState(false);
    const navigate = useNavigate();
    const { setIsRegistered } = useContext(ContextAPI);

    const handleSubmit = (e) => {
        const configuration = {
            method: "post",
            url: "https://apitakenotes.onrender.com/user",
            data: {
                firstName,
                lastName,
                email,
                password
            }
        };

        if(firstName && lastName && email && password) {
            try {
                axios(configuration).then((result) => {
                    console.log(result);
                    navigate("/");
                    setIsRegistered(true);
                 }).catch((error) => { 
                    console.log(error);
                    if(error.response.data.userAlreadyExists) {
                        setUserAlreadyExists(true);
                    }
                 })
            } catch (error) {
                console.log(error);
            }
        }
        setIsSubmit(true);
    };

    return (
        <Container>
            <Grid container justifyContent="center">
                <Box mt={12} height={(firstName === "" || lastName === "" || email === "" || password === "") && isSubmit ? 390 : 330} sx={{
                    width: 500,
                    p: 5,
                    borderRadius: 2
                }}>
                    <Stack direction="row" spacing={7}>
                        <TextField sx={{
                            "& .MuiInputLabel-root.Mui-focused": { color: "#0f8092" } , "& .MuiOutlinedInput-root.Mui-focused": {
                                "& > fieldset": { borderColor: "#0f8092" } }
                        }} error={isSubmit && firstName === ""} helperText={isSubmit && firstName === "" ? "Campo obrigatório" : ""} id="registerFirstName" value={firstName} label="Nome" variant="outlined" type="text" onChange={(e) => setFirstName(e.target.value)} />
                        <TextField sx={{
                            "& .MuiInputLabel-root.Mui-focused": { color: "#0f8092" } , "& .MuiOutlinedInput-root.Mui-focused": {
                                "& > fieldset": { borderColor: "#0f8092" } }
                        }} error={isSubmit && lastName === ""} helperText={isSubmit && lastName === "" ? "Campo obrigatório" : ""} id="registerLastName" value={lastName} label="Sobrenome" variant="outlined" type="text" onChange={(e) => setLastName(e.target.value)} />
                    </Stack>
                    <Stack direction="column" mt={3}>
                        <TextField sx={{
                            "& .MuiInputLabel-root.Mui-focused": { color: "#0f8092" } , "& .MuiOutlinedInput-root.Mui-focused": {
                                "& > fieldset": { borderColor: "#0f8092" } }
                        }} error={isSubmit && email === "" || userAlreadyExists} helperText={isSubmit && email === "" || userAlreadyExists ? userAlreadyExists ? "Email já cadastrado" : "Campo obrigatório" : ""} id="registerEmail" value={email} label="Email" variant="outlined" type="email" onChange={(e) => setEmail(e.target.value)} />
                    </Stack>
                    <Stack direction="column" mt={3}>
                        <TextField sx={{
                            "& .MuiInputLabel-root.Mui-focused": { color: "#0f8092" } , "& .MuiOutlinedInput-root.Mui-focused": {
                                "& > fieldset": { borderColor: "#0f8092" } }
                        }} error={isSubmit && password === ""} helperText={isSubmit && password === "" ? "Campo obrigatório" : ""} id="registerPassword" value={password} label="Digite sua senha" variant="outlined" type="password" onChange={(e) => setPassword(e.target.value)} />
                    </Stack>
                    <Stack direction="column" mt={3} spacing={15}>
                        <Button id="registerBtn" className="btn-register" sx={{
                            p: 1,
                            backgroundColor: "#0e899b",
                            "&:hover": { backgroundColor: "#0f8092" }
                        }} variant="contained" onClick={(e) => handleSubmit(e)}>Cadastrar</Button>
                    </Stack>
                    <Stack direction="column" mt={3}>
                        <Typography variant="subtitle3" gutterBottom>
                                Já possui cadastro? <Link sx={{ color: "#0f8092", textDecoration: "none" }} href="/">Faça o login</Link>.
                        </Typography>
                    </Stack>
                </Box>
            </Grid>
        </Container>
    );
};