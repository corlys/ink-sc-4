import { Keyring, ApiPromise, WsProvider } from "@polkadot/api";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { cryptoWaitReady } from "@polkadot/util-crypto";
import type { WeightV2 } from "@polkadot/types/interfaces"
import Constructor from "../../typechain-types/constructors/marketplace";

dotenv.config();

const main = async () => {
  const ready = await cryptoWaitReady();
  if (!ready) return;
  const wsProvider = new WsProvider("wss://shibuya-rpc.dwellir.com");
  const api = await ApiPromise.create({ provider: wsProvider });
  try {
    const proofSize = 131072
    const refTime = 6219235328

    const keyring = new Keyring({ type: "sr25519" });
    const PHRASE = process.env.PHRASE || "";
    const newPair = keyring.addFromUri(
      PHRASE,
      { name: "Compromised Account" },
    );

    //initiate contract
    const initContract = new Constructor(api, newPair);
    const { address: contractAddress } = await initContract.new({
      gasLimit: api.registry.createType('WeightV2', {
        refTime,
        proofSize,
      }) as WeightV2,
    });

    console.log("Deplyed Address at ", contractAddress);

    await api.disconnect();
  } catch (error) {
    console.log(error);
    await api.disconnect()
  }
};

main()
  .then()
  .catch((e) => console.log(e));
