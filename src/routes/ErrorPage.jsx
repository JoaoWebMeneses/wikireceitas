import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div>
            <h1>Erro 404!</h1>
            <button><Link to="/">Retorne a página</Link></button>
        </div>
    )
}

export default ErrorPage;