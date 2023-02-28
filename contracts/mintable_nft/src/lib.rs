#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

#[openbrush::contract]
pub mod mintable_nft {
    // imports from ink!
    use ink_storage::traits::SpreadAllocate;

    // imports from openbrush
    use openbrush::contracts::psp34::extensions::metadata::*;
    use openbrush::traits::Storage;
    use openbrush::contracts::ownable::*;
    

    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct MintableNFT {
        #[storage_field]
        psp34: psp34::Data,
        #[storage_field]
        ownable: ownable::Data
    }

    impl Ownable for MintableNFT {}

    // Section contains default implementation without any modifications
    impl PSP34 for MintableNFT {}

    impl MintableNFT {
        #[ink(constructor)]
        pub fn new() -> Self {
            let mut _instance = Self::default();
            _instance._init_with_owner(_instance.env().caller());
            _instance
        }

        #[ink(message)]
        #[openbrush::modifiers[only_owner]]
        pub fn withdraw(&mut self) {
            let caller = self.env().caller();
        }
    }
}
