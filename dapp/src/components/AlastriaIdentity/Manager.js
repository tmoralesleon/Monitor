import {newContextComponents} from "@drizzle/react-components";

import {addrSites} from "../../addr-config";

import Entity from "./Entity";
import CredentialRegistry from "./CredentialRegistry";

const {ContractData} = newContextComponents;

const Manager = ({drizzle, drizzleState}) => {

    let entities = [];
    for (let name in addrSites) {
        entities.push(
            <Entity drizzle={drizzle}
                    drizzleState={drizzleState}
                    name={name}
                    addr={addrSites[name]}
            />
        );     
    } 

    let entity = [];
    let index = -1;
    let i=0;
    let a = drizzleState.accounts[0];
    for(let name in addrSites){
        i++
        if(a === "0x6e3976aeaa3A59E4AF51783CC46EE0fFabC5DC11"){
            index = 0;
            entity = entities;
        }
        else if((addrSites[name] === a) && (a !== "0x6e3976aeaa3A59E4AF51783CC46EE0fFabC5DC11")){
            entity = entities[i-1];
            index = i-1;
        }
    }
    
    
    return (
        <article className="AlastriaIdentityManager">
            <h1>Manager</h1>
                <ContractData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract={"AlastriaIdentityManager"}
                    method={"version"}
                    methodArgs={[]}
                    render={v => <>
                        Versión: <span style={{color: "blue"}}>{v || "???"}</span>
                    </>}
                />
                <CredentialRegistry drizzle={drizzle}
                                    drizzleState={drizzleState}
                    />
                
                
                <h3 style={{color: "black"}}>{index === -1 ? "No dispone de información para la cuenta que está usando" :
                 "La información disponible para la cuenta que está usando es: " || "???"}</h3>
                
                {entity}
                 
                 
                 
                 

        </article>
    );
};

export default Manager;

