//ink imports
use ink::primitives::AccountId;
use ink::storage::Mapping;
//openbrush imports
use openbrush::traits::{Balance, ZERO_ADDRESS};

#[derive(scale::Encode, scale::Decode)]
#[cfg_attr(
    feature = "std",
    derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
)]
pub struct Inventory {
    seller: AccountId,
    buyer: AccountId,
    currency: AccountId,
    price: Balance,
    deadline: u128,
    kind: u8,
    status: u8,
}

impl Default for Inventory {
    fn default() -> Self {
        Inventory {
            seller: ZERO_ADDRESS.into(),
            buyer: ZERO_ADDRESS.into(),
            currency: ZERO_ADDRESS.into(),
            price: Default::default(),
            deadline: Default::default(),
            kind: Default::default(),
            status: Default::default(),
        }
    }
}

pub const INVENTORY_STORAGE_KEY: u32 = openbrush::storage_unique_key!(Data);

#[derive(Debug)]
#[openbrush::upgradeable_storage(INVENTORY_STORAGE_KEY)]
pub struct Data {
    pub inventories: Mapping<u128, Inventory>,
}

impl Default for Data {
    fn default() -> Self {
        Data {
            inventories: Mapping::default(),
        }
    }
}
