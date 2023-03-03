//ink imports
use ink::prelude::string::String;
use ink::primitives::AccountId;
use ink::storage::Mapping;
//openbrush imports
use openbrush::contracts::traits::ownable::OwnableError;
use openbrush::contracts::traits::psp34::PSP34Error;
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

pub enum Kinds {
    KindSell,
    KindBuy,
}

pub enum Status {
    Open,
    Cancelled,
    Done,
}

pub enum Opcodes {
    OpCompleteSellOnChain,
    OpCompleteBuyOnChain,
}

//POSSIBLE ERROR HERE, I DELETE Debug, PartialEq, Eq from derive
#[derive(scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
pub enum MarketplaceError {
    Custom(String),
    PSP34Error(PSP34Error),
    OwnableError(OwnableError),
}

impl From<PSP34Error> for MarketplaceError {
    fn from(value: PSP34Error) -> Self {
        MarketplaceError::PSP34Error(value)
    }
}

impl From<OwnableError> for MarketplaceError {
    fn from(value: OwnableError) -> Self {
        MarketplaceError::OwnableError(value)
    }
}
