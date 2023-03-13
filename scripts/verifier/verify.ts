import Contract from "../../typechain-types/contracts/verifier";
import * as dotenv from 'dotenv';
import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import { cryptoWaitReady } from "@polkadot/util-crypto"

dotenv.config();

const main = async () => {
  const result = await cryptoWaitReady()
  if (!result) return
  const wsProvider = new WsProvider("wss://shibuya-rpc.dwellir.com");
  //const wsProvider = new WsProvider("ws://localhost:9944");
  const api = await ApiPromise.create({ provider: wsProvider });
  try {

    const keyring = new Keyring();
    const PHRASE = process.env.PHRASE || ""
    const pair = keyring.addFromUri(PHRASE, { name: "compromised account" }, "ecdsa")

    const message = "bruh moment";
    const signature = Array.from(pair.sign(message));

    const contract = new Contract("aG5zUKztdChsL1LNUMkUN7CnTmXqNN58sEvxgvTtY5hiztd", pair, api);
    const verify = await contract.query.verify(message, pair.address, signature,);

    console.log(verify.value.unwrap());
    await api.disconnect()
  } catch (error) {

    console.log("ERROR")
    await api.disconnect();
  }
}

main().then().catch(e => console.log(e))
