//local create imports
pub use crate::{
    impls::inventory_management::types::{Data, Detail, MarketplaceError},
    traits::inventory_management::*,
};

//ink imports
use ink::env::hash::{Blake2x256, HashOutput};
//openbrush imports
use openbrush::contracts::ownable::*;
use openbrush::traits::{AccountId, Storage};

pub trait MarketplaceEvents {
    fn emit_sig(&self, result: [u8; 32], expected: AccountId);
}

impl<T> InventoryManagement for T
where
    T: Storage<Data> + Storage<ownable::Data>,
{
    default fn run(&mut self, detail: Detail, sig_detail: [u8; 65]) -> AccountId {
        let mut message_hash = <Blake2x256 as HashOutput>::Type::default();
        ink::env::hash_encoded::<Blake2x256, _>(&detail, &mut message_hash);
        let output = Self::env().ecdsa_recover(&sig_detail, &message_hash);

        let _recovered_compressed_address = output.unwrap();
        let mut _convert_to_account_id = <Blake2x256 as HashOutput>::Type::default();
        ink::env::hash_encoded::<Blake2x256, _>(
            &_recovered_compressed_address,
            &mut _convert_to_account_id,
        );

        AccountId::from(_convert_to_account_id)
    }
    default fn verify(&mut self, detail: Detail, signer: AccountId, signature: [u8; 65]) -> bool {
        ink::env::debug_println!("detail {:?}", detail);
        ink::env::debug_println!("signer {:?}", signer);
        ink::env::debug_println!("signature {:?}", signature);

        // let mut message_hash =
        //     <ink::env::hash::Blake2x256 as ink::env::hash::HashOutput>::Type::default();
        // ink::env::hash_bytes::<ink::env::hash::Blake2x256>(&detail, &mut message_hash);

        let mut message_hash =
            <ink::env::hash::Blake2x256 as ink::env::hash::HashOutput>::Type::default();
        ink::env::hash_encoded::<ink::env::hash::Blake2x256, _>(&detail, &mut message_hash);

        ink::env::debug_println!("message_hash {:?}", message_hash);

        let output = Self::env()
            .ecdsa_recover(&signature, &message_hash)
            .expect("Failed to recover");

        ink::env::debug_println!("pubkey {:?}", output);

        let mut signature_account_id =
            <ink::env::hash::Blake2x256 as ink::env::hash::HashOutput>::Type::default();
        ink::env::hash_encoded::<ink::env::hash::Blake2x256, _>(&output, &mut signature_account_id);

        ink::env::debug_println!("Sig account id {:?}", AccountId::from(signature_account_id));

        signer == AccountId::from(signature_account_id)
    }

    default fn hash(&mut self, detail: Detail) -> [u8; 32] {
        let mut message_hash = <Blake2x256 as HashOutput>::Type::default();
        ink::env::hash_encoded::<Blake2x256, _>(&detail, &mut message_hash);
        message_hash
    }
}

impl<T> MarketplaceEvents for T
where
    T: Storage<Data>,
{
    default fn emit_sig(&self, _result: [u8; 32], _expected: AccountId) {}
}
