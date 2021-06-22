const {
    addrAlastriaIdentityManager,
    addrSites
} = require("../addr-config");

module.exports = async function (callback) {

    console.log("Ejecutando script");

    try {
        const AlastriaIdentityManager = artifacts.require("AlastriaIdentityManager");
        const AlastriaProxy = artifacts.require("AlastriaProxy");

        console.log("Config: Address de Manager =", addrAlastriaIdentityManager);

        const alastriaIdentityManager = await AlastriaIdentityManager.at(addrAlastriaIdentityManager);

        console.log("Manager desplegdo en ", alastriaIdentityManager.address);

        let version = await alastriaIdentityManager.version();
        console.log("Version =", version.toNumber());

        // Consultar direcciones de los contratos internos:

        const alastriaCredentialRegistry = await alastriaIdentityManager.alastriaCredentialRegistry();
        console.log("\nalastriaCredentialRegistry =", alastriaCredentialRegistry);

        const alastriaPresentationRegistry = await alastriaIdentityManager.alastriaPresentationRegistry();
        console.log("alastriaPresentationRegistry =", alastriaPresentationRegistry);

        const alastriaPublicKeyRegistry = await alastriaIdentityManager.alastriaPublicKeyRegistry();
        console.log("alastriaPublicKeyRegistry =", alastriaPublicKeyRegistry);

        // Proxies
        const dumpInfoUserAccount = async (name, addr) => {
            const proxyAddr = await alastriaIdentityManager.identityKeys(addr);

            const alastriaProxy = await AlastriaProxy.at(proxyAddr);
            const owner = await alastriaProxy.owner();

            console.log("Proxy del", name, "=", proxyAddr," - Owner =", owner);
        };
        for (let name in addrSites) {
            await dumpInfoUserAccount(name, addrSites[name]);
        }

        // Entities:
        const dumpEntity = async (name, addr) => {
            const entity = await alastriaIdentityManager.getEntity(addr);
            console.log("Entity ", name, ":");
            console.log("   Name:", entity._name);
            console.log("   CIF:", entity._cif);
            console.log("   Logo:", entity._url_logo);
            console.log("   AID:", entity._createAID);
            console.log("   AOA:", entity._url_AOA);
            console.log("   Active:", entity._active ? "si" : "no");
        }
        for (let name in addrSites) {
            await dumpEntity(name, addrSites[name]);
        }
    } catch (err) {
        console.log('Error:', err);
    } finally {
        callback();
    }
}


