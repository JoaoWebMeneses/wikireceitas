import React, { useEffect, useState } from "react";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyDNP_dhg5VIdIhEXacvUY5dvX_XIiJg3v4",
    authDomain: "wikireceitas-6a0f0.firebaseapp.com",
    projectId: "wikireceitas-6a0f0",
})

const Home = () => {
    const [ingredientes, setIngredientes] = useState("");
    const [preparo, setPreparo] = useState("");
    const [titulo, setTitulo] = useState("");
    const [url, setUrl] = useState("");
    const [receitas, setReceitas] = useState([]);

    const db = getFirestore(firebaseApp);
    const receitaCollectionRef = collection(db, 'receitas')

    useEffect(() => {
        const getReceitas = async () => {
            const data = await getDocs(receitaCollectionRef);
            setReceitas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getReceitas();
    }, []);

    return (
        <div className="receita">
            {receitas.map((receita) => {
                    return(
                        <div className="receita" id>
                            <h1>{receita.titulo}</h1>
                            <img src={receita.url}></img>
                            <h3>Modo de preparo: <br/>{receita.ingredientes}</h3>
                            <p>{receita.preparo}</p>
                        </div>
                    )
            })}
        </div>
    )
}

export default Home;