#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

#[openbrush::contract]
pub mod marketplace {
    //imports from ink
    // use ink::codegen::{ EmitEvent, Env };
    // use ink::storage::Mapping;
    //imports from openbrush
    use openbrush::traits::Storage;
    //imports from logic library
    use logics::impls::inventory_management::types::{ self };

    #[ink(storage)]
    #[derive(Storage, Default)]
    pub struct Marketplace {
        #[storage_field]
        inventory_data: types::Data,
    }

    impl Marketplace {
        #[ink(constructor)]
        pub fn new() -> Self {
            let mut _instance = Self::default();
            _instance
        }

        #[ink(message)]
        pub fn get_market_fee(&self) -> u32 {
            89
        }
    }
}