//local create imports
pub use crate::{
    impls::inventory_management::types::{Data, Detail, MarketplaceError},
    traits::inventory_management::*,
};

//ink imports
use ink::env::hash::{Blake2x256, HashOutput, Keccak256};
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
    default fn run(
        &mut self,
        detail: Detail,
        sig_detail: [u8; 65],
    ) -> Result<(), MarketplaceError> {
        let mut message_hash = <Keccak256 as HashOutput>::Type::default();
        ink::env::hash_encoded::<Keccak256, _>(&detail, &mut message_hash);
        let output = Self::env().ecdsa_recover(&sig_detail, &message_hash);

        let _recovered_compressed_address = output.unwrap();
        let mut _convert_to_account_id = <Blake2x256 as HashOutput>::Type::default();
        ink::env::hash_encoded::<Blake2x256, _>(
            &_recovered_compressed_address,
            &mut _convert_to_account_id,
        );

        let caller = Self::env().caller();

        self.emit_sig(_convert_to_account_id, caller);

        Ok(())
    }
}

impl<T> MarketplaceEvents for T
where
    T: Storage<Data>,
{
    default fn emit_sig(&self, _result: [u8; 32], _expected: AccountId) {}
}
