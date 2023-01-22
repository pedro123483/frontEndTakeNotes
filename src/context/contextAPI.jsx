import { createContext, useState } from "react";

export const ContextAPI = createContext();

export const ContextAPIProvider = (props) => {
    const [isRegistered, setIsRegistered] = useState(false);
    const [notes, setNotes] = useState([]);
    const [openNote, setOpenNote] = useState(false);
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [explanation, setExplanation] = useState("");
    const [change, setChange] = useState(false);

    return (
        <ContextAPI.Provider value={{ isRegistered, setIsRegistered, notes, setNotes, openNote, setOpenNote, category, setCategory, title, setTitle, explanation, setExplanation, change, setChange }}>
            {props.children}
        </ContextAPI.Provider>
    );
};