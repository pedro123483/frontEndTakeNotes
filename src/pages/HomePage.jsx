import { Container } from "@mui/system";
import { Stack } from "@mui/system";
import { Button } from "@mui/material";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import takeNotes from "../api/takeNotes";
import "../index.css";
import { Avatar } from "@mui/material";
import { Notes } from "../components/Notes";
import { Grid } from "@mui/material";
import { useContext } from "react";
import { ContextAPI } from "../context/contextAPI";
import { TextField } from "@mui/material";
import { Dialog } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogActions } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";
import PostAddSharpIcon from '@mui/icons-material/PostAddSharp';
import axios from "axios";

const cookie = new Cookies();

export const HomePage = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [user, setUser] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);
    const { change, setChange } = useContext(ContextAPI);
    const { setNotes, notes } = useContext(ContextAPI);

    const logout = () => {
        cookie.remove("TOKEN");
        navigate("/");
        setNotes([]);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await takeNotes.get("/user/auth", {
                    headers: {
                        Authorization: `Bearer ${cookie.get("TOKEN")}`
                    }
                });

                setFirstName(response.data.user.userFirstName);
                setLastName(response.data.user.userLastName);
                fetchUserNotes(response.data.user.userId);
                setUser(response.data.user.userId);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };

        fetchData();
    }, [change]);

    const fetchUserNotes = async (id) => {
        try {
            const response = await takeNotes.get(`/note/byUser/${id}`);
            if(response.data) {
                setNotes(response.data);
            } else {
                setChange(!change);
                setNotes([]);
            }
            console.log(response);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setIsSubmit(false);
        setCategory("");
        setTitle("");
    };

    const handleChange = (e) => {
        setCategory(e.target.value);
    };

    const createNote = () => {
        if(title && category) {
            const configurantion = {
                method: "post",
                url: "https://apitakenotes.onrender.com/note",
                data: {
                    title,
                    category,
                    user
                }
            };
    
            axios(configurantion).then((result) => { 
                setChange(!change);
                setLoading(false);
                setCategory("");
                setTitle("");
                setIsSubmit(false);
             }).catch((error) => { console.log(error) });
            setOpen(false);
            setLoading(true);
        }

        setIsSubmit(true);
    };

    const searchByTitle = (title) => {
        const configuration = {
            method: "get",
            url: `https://apitakenotes.onrender.com/note/search/?title=${title}&id=${user}`,
        };

        axios(configuration).then((result) => { 
            console.log(result.data.result);
            setNotes(result.data.result);
         }).catch((error) => {
            console.log(error.message);
         });
    };
    return ( 
        <>
        <Container>
            <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                <Avatar sx={{ backgroundColor: "#0f8092" }}>{firstName.charAt(0).toUpperCase()}{lastName.charAt(0).toUpperCase()}</Avatar>
                <h1>Bem Vindo(a)!</h1>
                <Button variant="contained" onClick={() => logout()} sx={{
                    backgroundColor: "#0f8092",
                    "&:hover": { backgroundColor: "#0f8092" }
                }}>Sair</Button>
            </Stack>
            <Stack direction="row" justifyContent="center" mt={10}>
                <TextField sx={{ width: "50ch","& .MuiInputLabel-root.Mui-focused": { color: "#0f8092" } , "& .MuiOutlinedInput-root.Mui-focused": {
                    "& > fieldset": { borderColor: "#0f8092" }
                } }} label="Pesquisar" id="search" size="small" onChange={(e) => searchByTitle(e.target.value)}></TextField>
                <PostAddSharpIcon onClick={handleClickOpen} className="logo-add"></PostAddSharpIcon>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Adicionar nota</DialogTitle>
                    <DialogContent>  
                    <InputLabel id="title-label">Assunto</InputLabel>   
                    <TextField sx={{ "& .MuiOutlinedInput-root.Mui-focused": {
                                "& > fieldset": { borderColor: "#0f8092" } }} } error={isSubmit && title == ""} size="small" labelid="title-label" id="title" onChange={(e) => setTitle(e.target.value)}></TextField>
                    </DialogContent>
                    <DialogContent>
                        <InputLabel id="category-label">Matéria</InputLabel>
                        <Select error={isSubmit && category == ""} sx={{ width: "25ch", "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#0f8092" } } } size="small" labelid="category-label" id="category" onChange={handleChange} value={category}>
                            <MenuItem value="coding">Programação</MenuItem>
                            <MenuItem value="business">Negócios</MenuItem>
                            <MenuItem value="ux">UX</MenuItem>
                            <MenuItem value="math">Matemática</MenuItem>
                        </Select>
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{ color: "#0f8092"}} onClick={handleClose}>Cancelar</Button>
                        <Button sx={{ color: "#0f8092"}} onClick={createNote}>Adicionar</Button>
                    </DialogActions>
                </Dialog>
            </Stack>
            {loading && (
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>  
                )}   
            <Grid container spacing={5} mt={5}>
                <Notes />
            </Grid>
            {
                notes.length === 0 ? <Stack direction="row" justifyContent="center" mt={5}><h1>Você não possui nenhuma nota no momento!</h1></Stack> : ""
            } 
        </Container>
        </>
    );
};