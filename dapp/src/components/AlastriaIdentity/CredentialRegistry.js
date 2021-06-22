import {newContextComponents} from "@drizzle/react-components";

const {ContractData} = newContextComponents;

const CredentialRegistry = ({drizzle, drizzleState}) => {

    return (
        <article className="AlastriaIdentityCredentialRegistry">
            <h3>CredentialRegistry:</h3>

            <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract={"AlastriaIdentityManager"}
                method={"alastriaCredentialRegistry"}
                methodArgs={[]}
                render={addr => <ul>
                    <li>address: <span style={{color: "blue"}}>{addr || "???"}</span></li>
                </ul>}
            /> 
            
            
        </article>
    );
};

export default CredentialRegistry;

