import { decodeAddress, encodeAddress } from '@polkadot/util-crypto'
import { u8aToHex } from '@polkadot/util'


export const decode = (ss58_address: string | Uint8Array) => {
  const publicKey = decodeAddress(ss58_address)
  const hexPublicKey = u8aToHex(publicKey)
  return hexPublicKey
}

export const encode = (pubkey_address: string | Uint8Array, prefix: number) => {
  const ss58Address = encodeAddress(pubkey_address, prefix)
  return ss58Address
}

export const pubKeyToAstar = (pubkey_address: string | Uint8Array) => encode(pubkey_address, 5);
