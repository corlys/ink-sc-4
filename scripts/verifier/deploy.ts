import Constructor from "../../typechain-types/constructors/verifier"
import { ApiPromise, Keyring, WsProvider } from "@polkadot/api";
import { cryptoWaitReady } from "@polkadot/util-crypto";
import * as dotenv from "dotenv"
import type { WeightV2 } from "@polkadot/types/interfaces"
dotenv.config()

const main = async () => {

  const proofSize = 131072
  const refTime = 6219235328


  const result = cryptoWaitReady();
  if (!result) return
  const wsProvider = new WsProvider("wss://shibuya-rpc.dwellir.com");
  //const wsProvider = new WsProvider("ws://localhost:9944");
  const api = await ApiPromise.create({ provider: wsProvider });
  try {
    const PHRASE = process.env.PHRASE || "";
    const keyring = new Keyring();
    const pair = keyring.addFromUri(PHRASE, { name: "compromised account" }, "sr25519");

    const initContract = new Constructor(api, pair);
    const { address: contractAddress } = await initContract.new({
      gasLimit: api.registry.createType('WeightV2', {
        refTime,
        proofSize,
      }) as WeightV2,
    });

    console.log("Deplyed Address at ", contractAddress);

    await api.disconnect();


  } catch (e) {
    await api.disconnect();
  }
}

main().then().catch(e => console.log(e))
