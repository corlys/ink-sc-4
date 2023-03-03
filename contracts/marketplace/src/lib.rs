#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

#[openbrush::contract]
pub mod marketplace {
    //imports from ink
    use ink::storage::Mapping;
    //imports from openbrush

    #[derive(scale::Decode, scale::Encode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout))]
    //#[ink::storage_item]
    pub struct Inventory {
        seller: AccountId,
        buyer: AccountId,
        currency: Option<AccountId>,
        price: Balance,
        deadline: u128,
        kind: u8,
        status: u8,
    }

    #[ink(storage)]
    #[derive(Default)]
    pub struct Marketplace {
        market_fee: u32,

        inventories: Mapping<u128, Inventory>,
    }

    impl Marketplace {
        #[ink(constructor)]
        pub fn new() -> Self {
            let mut _instance = Self::default();
            _instance.market_fee = 3;
            _instance.inventories = Mapping::default();
            _instance
        }

        #[ink(message)]
        pub fn get_market_fee(&self) -> u32 {
            self.market_fee
        }
    }
}