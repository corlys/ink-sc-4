import { Keyring, ApiPromise, WsProvider } from '@polkadot/api';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { cryptoWaitReady, keccak256AsU8a } from "@polkadot/util-crypto"
import BN from "bn.js"

dotenv.config()

const main = async () => {
  //pub struct Detail {
  //  inventory_id: u128,
  //  opcode: u8,
  //  caller: AccountId,
  //  price: Balance,
  //}
  const ready = await cryptoWaitReady();
  if (!ready) return
  const keyring = new Keyring({ type: "sr25519" });
  const PHRASE = process.env.PHRASE || "";
  const newPair = keyring.addFromUri(PHRASE);

  console.log(newPair.address);
  const pow18 = new BN(10).pow(new BN(18));

  const wsProvider = new WsProvider('wss://rpc.polkadot.io');
  const api = await ApiPromise.create({ provider: wsProvider });
  const inventoryId = api.createType('u128', 1).toU8a();
  const opcode = api.createType('u8', 1).toU8a();
  const caller = api.createType('AccountId', newPair.address).toU8a();
  const price = api.createType('Balance', new BN(5).mul(pow18)).toU8a();

  const concat = u8aConcat(inventoryId, opcode, caller, price);
  console.log(concat)

  const hashIt = keccak256AsU8a(concat);
  console.log(hashIt)

}

const u8aConcat = (inventoryId: Uint8Array, opcode: Uint8Array, caller: Uint8Array, price: Uint8Array) => {
  return new Uint8Array([...inventoryId, ...opcode, ...caller, ...price]);
}

main().then().catch(e => console.log(e));
