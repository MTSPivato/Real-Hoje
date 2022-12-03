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
            <div className="corpoApp">
                <h1>Real Hoje</h1>
                <div className="container">
                    <h2 className="txtCovercao">Coversão</h2>
                    <div className="grupoMoedas">
                        <div className="moeda1">
                            <div className="moeda">
                                <h3>{moedaBase}: </h3>
                            </div>
                            <input
                                className="inputMoeda1"
                                type="number"
                                value={moedaBasev}
                                onChange={(e) => setMoedaBaseV(e.target.value)}
                            />
                            <div className="botao1">
                                <select
                                    className="selectMoeda1"
                                    value={moedaBase}
                                    onChange={(e) =>
                                        setMoedaBase(e.target.value)
                                    }
                                >
                                    <option value="BRL">Real</option>
                                    <option value="USD">Dolar</option>
                                    <option value="EUR">Euro</option>
                                    <option value="GBP">Libra</option>
                                    <option value="ARS">Peso Argentino</option>
                                    <option value="BTC">Bitcoin</option>
                                </select>
                            </div>
                        </div>
                        <div className="moeda2">
                            <div className="moeda">
                                <h3>{moedaFinal}: </h3>
                            </div>
                            <input
                                className="inputMoeda2"
                                type="number"
                                disabled={true}
                                value={moedaFinalv.toFixed(2)}
                                onChange={(e) => setMoedaFinalV(e.target.value)}
                            />
                            <div className="botao2">
                                <select
                                    className="selectMoeda2"
                                    value={moedaFinal}
                                    onChange={(e) =>
                                        setMoedaFinal(e.target.value)
                                    }
                                >
                                    <option value="BRL">Real</option>
                                    <option value="USD">Dolar</option>
                                    <option value="EUR">Euro</option>
                                    <option value="GBP">Libra</option>
                                    <option value="ARS">Peso Argentino</option>
                                    <option value="BTC">Bitcoin</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="msgErro">{msgErro}</div>
                </div>
            </div>
        </div>
    );
}

export default App;
