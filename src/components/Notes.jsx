import { useContext, useState } from "react";
import { ContextAPI } from "../context/contextAPI";
import { Card, CardContent, DialogActions } from "@mui/material";
import { CardActions } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { Dialog } from "@mui/material";
import { DialogTitle} from "@mui/material";
import axios from "axios";
import coding from "../images/coding.jpg";
import business from "../images/business.jpg";
import math from "../images/math.jpg";
import ux from "../images/ux.jpg";

export const Notes = () => {
    const { notes } = useContext(ContextAPI);
    const { setOpenNote, openNote } = useContext(ContextAPI);
    const { title, setTitle } = useContext(ContextAPI);
    const { category, setCategory } = useContext(ContextAPI);
    const { explanation, setExplanation } = useContext(ContextAPI);
    const { setChange, change } = useContext(ContextAPI);
    const [openDeleteNote, setOpenDeleteNote] = useState(false);
    const [idNoteToDelete, setIdNoteToDelete] = useState("");

    const showNote = (categoryNote, titleNote, explanationNote) => {
        setOpenNote(true);
        setCategory(categoryNote);
        setTitle(titleNote);
        setExplanation(explanationNote);
        console.log(category);
        console.log(title);
        console.log(explanation);
    };

    const handleCloseNote = () => {
        setOpenNote(false);
    };

    const handleCloseDeleteNote = () => {
        setOpenDeleteNote(false);
    };

    const handleOpenDeleteNote = (id) => {
        setOpenDeleteNote(true);
        setIdNoteToDelete(id);
    };

    const deleteNote = () => {
        const configuration = {
            method: "delete",
            url: `https://apitakenotes.onrender.com/note/${idNoteToDelete}`,
        }

        axios(configuration).then((result) => { 
            console.log(result);
            setChange(!change);
        }).catch((error) => { 
            console.log(error);
        });
         
        setOpenDeleteNote(false);
    };
    
    return (
        <>
            {
                notes.map((note) => {
                    return <Grid key={note._id} item xs={12} sm={6} md={6} lg={3} xl={3}>
                        <Card sx={{ width: 250 }}>
                            <CardMedia component="img" alt={note.category} height="140" image={note.category == "business" ? business : note.category == "coding" ? coding : note.category == "math" ? math : ux} />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    {note.title[0].toUpperCase() + note.title.slice(1)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {note.explanation.slice(0, 50)}...
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button sx={{ color: "#0f8092"}} size="small" onClick={() => showNote(note.category, note.title, note.explanation)} >Ver mais</Button>
                                <Button sx={{ color: "#0f8092"}} size="small" onClick={() => handleOpenDeleteNote(note._id)}>Excluir Nota</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                })
            }
            {openNote && (
                <Dialog open={openNote} onClose={handleCloseNote} scroll="paper">
                <Card sx={{ width: 500, overflow: "auto" }}>
                    <CardMedia component="img" alt={category} height="140" image={category == "business" ? business : category == "coding" ? coding : category == "math" ? math : ux} />
                    <CardContent >
                        <Typography gutterBottom variant="h6" component="div">
                            {title[0].toUpperCase() + title.slice(1)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {explanation}
                        </Typography>
                    </CardContent>
                </Card>
            </Dialog>
            )}
            <Dialog open={openDeleteNote} onClose={handleCloseDeleteNote}>
                <DialogTitle>
                    {"Deseja excluir essa nota?"}
                </DialogTitle>
                <DialogActions>
                    <Button sx={{ color: "#0f8092"}} onClick={handleCloseDeleteNote}>Cancelar</Button>
                    <Button sx={{ color: "#0f8092"}} onClick={deleteNote}>Excluir</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};