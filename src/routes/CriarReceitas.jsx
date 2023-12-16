import React, { useEffect, useState } from "react";
import { getFirestore, getDocs, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import "./CriarReceitas.css";
import { BsSend } from "react-icons/bs";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyDNP_dhg5VIdIhEXacvUY5dvX_XIiJg3v4",
    authDomain: "wikireceitas-6a0f0.firebaseapp.com",
    projectId: "wikireceitas-6a0f0",
})

const CriarReceitas = () => {
    const [ingredientes, setIngredientes] = useState("");
    const [preparo, setPreparo] = useState("");
    const [titulo, setTitulo] = useState("");
    const [url, setUrl] = useState("");
    const [receitas, setReceitas] = useState([]);

    const db = getFirestore(firebaseApp);
    const receitaCollectionRef = collection(db, 'receitas')

    async function createReceita() {
        const receita = await addDoc(receitaCollectionRef, {
            titulo,
            ingredientes,
            preparo,
            url,
        });
        console.log(receita);
    }

    useEffect(() => {
        const getReceitas = async () => {
            const data = await getDocs(receitaCollectionRef);
            setReceitas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getReceitas();
    }, []);

    return (
        <div>
            <h1>Crie sua receita</h1>
            <textarea placeholder="Titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)}></textarea>
            <br/>
            <textarea placeholder="Ingredientes" value={ingredientes} onChange={(e) => setIngredientes(e.target.value)}></textarea>
            <br/>
            <textarea placeholder="Modo de Preparo" value={preparo} onChange={(e) => setPreparo(e.target.value)}></textarea>
            <br/>
            <textarea placeholder="Url da imagem de sua comida" value={url} onChange={(e) => setUrl(e.target.value)}/>
            <br/>
            <br/>
            <button onClick={createReceita}><BsSend /></button>
        </div>
    )
}

export default CriarReceitas;