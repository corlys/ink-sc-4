import { Keyring, ApiPromise, WsProvider } from "@polkadot/api";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { cryptoWaitReady, keccak256AsU8a, blake2AsU8a } from "@polkadot/util-crypto";
import BN from "bn.js";
import { u8aToHex } from "@polkadot/util";
import { Detail } from "../../typechain-types/types-arguments/marketplace"
import Contract from "../../typechain-types/contracts/marketplace";
import { pubKeyToAstar } from "../helper"

dotenv.config();

const main = async () => {
  const ready = await cryptoWaitReady();
  if (!ready) return;

  const wsProvider = new WsProvider("wss://shibuya-rpc.dwellir.com");
  const api = await ApiPromise.create({ provider: wsProvider });

  try {
    const keyring = new Keyring();
    const newPair = keyring.addFromUri(
      "//Alice", { name: "AliceECDSA" }, "ecdsa"
    );

    const pow18 = new BN(10).pow(new BN(18));


    const inventoryId = api.createType("u128", 1).toU8a();
    const opcode = api.createType("u8", 1).toU8a();
    const caller = api.createType("AccountId", pubKeyToAstar(newPair.publicKey)).toU8a();
    const price = api.createType("Balance", new BN(5).mul(pow18)).toU8a();

    const concat = u8aConcat(inventoryId, opcode, caller, price);

    const signature = Array.from(newPair.sign(concat));

    const contract = new Contract("X8QCSv62NWo9YNwNQ95zgnwJ22GEMxkZo9F7iQhvaj7R9dt", newPair, api);

    const detail: Detail = {
      opcode: 1,
      inventoryId: 1,
      caller: pubKeyToAstar(newPair.publicKey),
      price: new BN(5).mul(pow18)
    }

    const verify = await contract.query.verify(detail, newPair.address, signature)

    console.log(verify.value.unwrap())

    await api.disconnect();
  } catch (error) {
    console.log(error);
  }


};

const u8aConcat = (
  inventoryId: Uint8Array,
  opcode: Uint8Array,
  caller: Uint8Array,
  price: Uint8Array
) => {
  return new Uint8Array([...inventoryId, ...opcode, ...caller, ...price]);
};

main()
  .then()
  .catch((e) => console.log(e));
