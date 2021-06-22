import {newContextComponents} from "@drizzle/react-components";

const {ContractData} = newContextComponents;

const Entity = ({addr, name, drizzle, drizzleState}) => {

    return (
        <article className="AlastriaIdentityEntity">
            <h3>Entity: {name} - [{addr}]</h3>
            <ul>
                <ContractData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract={"AlastriaIdentityManager"}
                    method={"getEntity"}
                    methodArgs={[addr]}
                    render={r => <>
                        <li>Name: <span style={{color: "blue"}}>{r._name || "???"}</span></li>
                        <li>CIF: <span style={{color: "blue"}}>{r._cif || "???"}</span></li>
                        <li>Logo: <span style={{color: "blue"}}>{r._url_logo || "???"}</span></li>
                        <li>AID: <span style={{color: "blue"}}>{r._createAID || "???"}</span></li>
                        <li>AOA: <span style={{color: "blue"}}>{r._url_AOA || "???"}</span></li>
                        <li>Active: <span style={{color: "blue"}}>{r._active ? "si" : "no" || "???"}</span></li>   

                    </>}
                />

                <ContractData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract={"AlastriaIdentityManager"}
                    method={"getEidasLevel"}
                    methodArgs={[addr]}
                    render={eidas => <>
                        <li>EidasLevel: <span style={{color: "blue"}}>{eidas || "???"}</span></li>
                    </>}
                />

                <ContractData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract={"AlastriaIdentityManager"}
                    method={"isOwner"}
                    methodArgs={[addr]}
                    render={owner => <>
                        <li>¿Owner?: <span style={{color: "blue"}}>{owner ? "si" : "no" || "???"}</span></li>
                    </>}
                />




                
            </ul>
        </article>
    );
};

export default Entity;


