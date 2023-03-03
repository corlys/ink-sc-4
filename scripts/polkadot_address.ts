import { decodeAddress, encodeAddress } from '@polkadot/util-crypto'
import { u8aToHex } from '@polkadot/util'

const main = async () => {
  const pubkeyAddress = decode(
    '5Cex4FeQH6ydKsfwBAvZpCiPtoNxAd7EfUdwY4CPU9un5Gk9'
  )
  const encodeToAstar = encode(pubkeyAddress, 5)
  console.log(pubkeyAddress, encodeToAstar)
}

const decode = (ss58_address: string) => {
  const publicKey = decodeAddress(ss58_address)
  const hexPublicKey = u8aToHex(publicKey)
  return hexPublicKey
}

const encode = (pubkey_address: string, prefix: number) => {
  const ss58Address = encodeAddress(pubkey_address, prefix)
  return ss58Address
}

main()
  .then()
  .catch((err) => console.log(err))
