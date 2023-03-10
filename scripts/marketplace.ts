import { Keyring, ApiPromise, WsProvider } from "@polkadot/api";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { cryptoWaitReady, keccak256AsU8a } from "@polkadot/util-crypto";
import BN from "bn.js";
import { u8aToHex } from "@polkadot/util";
import Constructor from "../typechain-types/constructors/marketplace";
import { Detail } from "../typechain-types/types-arguments/marketplace"
import Contract from "../typechain-types/contracts/marketplace";
import { pubKeyToAstar } from "./helper"

dotenv.config();

const main = async () => {
  try {
    const ready = await cryptoWaitReady();
    if (!ready) return;
    const keyring = new Keyring();
    const PHRASE = process.env.PHRASE || "";
    const newPair = keyring.addFromUri(
      PHRASE,
      { name: "Compromised Account" },
      "ecdsa"
    );

    console.log(newPair.address);
    const pow18 = new BN(10).pow(new BN(18));

    const wsProvider = new WsProvider("wss://rpc.polkadot.io");
    const api = await ApiPromise.create({ provider: wsProvider });
    const inventoryId = api.createType("u128", 1).toU8a();
    const opcode = api.createType("u8", 1).toU8a();
    const caller = api.createType("AccountId", pubKeyToAstar(newPair.publicKey)).toU8a();
    const price = api.createType("Balance", new BN(5).mul(pow18)).toU8a();

    const concat = u8aConcat(inventoryId, opcode, caller, price);
    //console.log(concat)

    const hashIt = keccak256AsU8a(concat);
    console.log("message hash", hashIt);

    const signature = newPair.sign(hashIt);

    console.log("signature : ", signature);
    console.log("hex signature : ", u8aToHex(signature));

    const isValid = newPair.verify(hashIt, signature, newPair.publicKey);
    console.log("isValid : ", isValid);

    //initiate contract
    const initContract = new Constructor(api, newPair);
    const { address: contractAddress, result } = await initContract.new({
    });
    console.log(result)
    console.log("Contract Deployed at : ", contractAddress);
    const contract = new Contract(contractAddress, newPair, api);

    const detail: Detail = {
      opcode: 1,
      inventoryId: 1,
      caller: pubKeyToAstar(newPair.publicKey),
      price: new BN(5).mul(pow18)
    }

    const run = await contract.query.run(detail, [...signature]);
    console.log(run);
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
