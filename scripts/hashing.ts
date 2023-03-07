import {keccak256AsU8a} from "@polkadot/util-crypto"

const main = async () => {
  
  const testHash = keccak256AsU8a("cunt")

  console.log(testHash.length)

}

main().then().catch(e => console.log(e));
