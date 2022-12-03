import React, { useState, useEffect }  from "react";
import "./App.css";

function App() {
    const [moedaBase, setMoedaBase] = useState("USD");
    const [moedaBasev, setMoedaBaseV] = useState(1);
    const [moedaFinal, setMoedaFinal] = useState("BRL");
    const [moedaFinalv, setMoedaFinalV] = useState("");
    const [msgErro, setMsgErro] = useState("");

    function coversaoMoeda() {
        if (moedaBase === moedaFinal) {
            setMsgErro("Selecione moedas diferentes");
            setMoedaFinalV(1);
            return;
        }
        setMsgErro("");
        fetch(
            `https://economia.awesomeapi.com.br/json/${moedaBase}-${moedaFinal}`
        )
            .then((res) => res.json())
            .then((data) => {
                setMoedaFinalV(moedaBasev * data[0].high);
            });
    }

    useEffect(() => {
        coversaoMoeda();
    }, [moedaBase, moedaFinal, moedaBasev, moedaFinalv]);

    return (
        <div className="App">
            z
        </div>
    );
}

export default App;
