import React, { useState, useEffect } from "react";
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
            setMoedaFinalV(" ");
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
        <React.Fragment>
            <div className="corpoApp">
                <h1>Real Hoje</h1>
                <h2 className="txtCovercao">Coversão</h2>
                <div className="grupoMoedas">
                    <input
                        className="inputMoeda1"
                        type="number"
                        value={moedaBasev}
                        onChange={(e) => setMoedaBaseV(e.target.value)}
                    />
                    <select
                        className="selectMoeda1"
                        value={moedaBase}
                        onChange={(e) => setMoedaBase(e.target.value)}
                    >
                        <option value="BRL">Real</option>
                        <option value="USD">Dolar</option>
                        <option value="EUR">Euro</option>
                        <option value="GBP">Libra</option>
                        <option value="ARS">Peso Argentino</option>
                        <option value="BTC">Bitcoin</option>
                    </select>
                    <h3>Vale:</h3>
                    <input
                        className="inputMoeda2"
                        type="number"
                        disabled={true}
                        value={moedaFinalv}
                        onChange={(e) => setMoedaFinalV(e.target.value)}
                    />
                    <select
                        className="selectMoeda1"
                        value={moedaFinal}
                        onChange={(e) => setMoedaFinal(e.target.value)}
                    >
                        <option value="BRL">Real</option>
                        <option value="USD">Dolar</option>
                        <option value="EUR">Euro</option>
                        <option value="GBP">Libra</option>
                        <option value="ARS">Peso Argentino</option>
                        <option value="BTC">Bitcoin</option>
                    </select>
                </div>
                <a className="msgErro">{msgErro}</a>
            </div>
        </React.Fragment>
    );
}

export default App;
