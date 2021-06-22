import React from 'react';

import {DrizzleContext} from "@drizzle/react-plugin";

import addrConfig from "../addr-config";

import AlastriaIdentityManagerJSON from '../contracts/AlastriaIdentityManager.json'


import Manager from "./AlastriaIdentity/Manager";

import '../css/App.css';

// Añade un contrato a Drizzle para que lo atienda.
const addContract = (drizzle, name, abi, addr) => {

    const contractConfig = {
        contractName: name,
        web3Contract: new drizzle.web3.eth.Contract(abi, addr)
    };

    drizzle.addContract(contractConfig, []);
}

function App() {
    return (
        <DrizzleContext.Consumer>
            {drizzleContext => {
                const {drizzle, drizzleState, initialized} = drizzleContext;

                if (!initialized) {
                    return (<main><h1>⚙️ Cargando dapp...</h1></main>);
                }

                return (
                    <ContractLauncher drizzle={drizzle}
                                      drizzleState={drizzleState}/>
                );
            }}
        </DrizzleContext.Consumer>
    );
}


class ContractLauncher extends React.Component {

    componentDidMount() {
        if (!this.props.drizzleState.contracts.AlastriaIdentityManager) {
            addContract(this.props.drizzle, "AlastriaIdentityManager", AlastriaIdentityManagerJSON.abi, addrConfig.addrAlastriaIdentityManager);
        }
    }

    render() {
        if (!this.props.drizzleState.contracts.AlastriaIdentityManager ||
            !this.props.drizzleState.contracts.AlastriaIdentityManager.initialized) return "Cargando Contratos en Drizzle...";

        return (
            <div className="App">
                <header className="App-header">
                    <p>
                        Monitor
                    </p>
                </header>

                <Manager drizzle={this.props.drizzle}
                         drizzleState={this.props.drizzleState}/>
            </div>
        );
    }
}

export default App;
