import React, { useEffect, useState } from "react";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyDNP_dhg5VIdIhEXacvUY5dvX_XIiJg3v4",
    authDomain: "wikireceitas-6a0f0.firebaseapp.com",
    projectId: "wikireceitas-6a0f0",
})

const Home = () => {
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
        <div className="receitas">
            {receitas.map((receita) => {
                    return(
                        <div className="receita" id>
                            <h1>{receita.titulo}</h1>
                            <img src={receita.url}></img>
                            <h3>Ingredientes: <br/>{receita.ingredientes}</h3>
                            <h3>Modo de preparo: <br/>{receita.preparo}</h3>
                        </div>
                    )
            })}
        </div>
    )
}

export default Home;