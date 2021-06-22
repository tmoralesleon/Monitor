import {Drizzle} from '@drizzle/store';


// Opciones:
const options = {
    contracts: [],
    polls: {
        accounts: 3000,
    },
    web3: {
        fallback: {
            type: "ws",
            url: "ws://63.33.206.111/rpc"
        }
    }
}

// Crear y exportar el objeto drizzle:
export default new Drizzle(options);
