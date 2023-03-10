#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

#[openbrush::contract]
pub mod mintable_nft {
    // imports from ink!
    use ink::storage::Mapping;
    use ink::codegen::{Env,EmitEvent};
    // imports from openbrush
    use openbrush::contracts::ownable::*;
    use openbrush::contracts::psp34::extensions::metadata::*;
    use openbrush::traits::{Storage, String};

    //SpreadAllocate, SpreadLayout, PackedLayout, PackedAllocate have been removed
    //switched to macro #[ink::storage_item]

    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct NftContract {
        #[storage_field]
        psp34: psp34::Data,

        #[storage_field]
        ownable: ownable::Data,

        #[storage_field]
        metadata: metadata::Data,

        last_token_id: u32,

        mint_amount: Mapping<AccountId, u32>,

        max_mint_amount: u32,
    }

    #[ink(event)]
    pub struct Transfer {
        #[ink(topic)]
        from: Option<AccountId>,

        #[ink(topic)]
        to: Option<AccountId>,

        #[ink(topic)]
        id: Id,
    }

    #[ink(event)]
    pub struct Approval {
        #[ink(topic)]
        from: AccountId,

        #[ink(topic)]
        to: AccountId,

        #[ink(topic)]
        id: Option<Id>,

        approved: bool,
    }

    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        FundIsNotEnough(String),
        WithdrawFailed(String),
        MintAmountExceed(String),
        PSP34Error(PSP34Error),
        OwnableError(OwnableError),
        Custom(String),
    }

    impl From<PSP34Error> for Error {
        fn from(psp34_error: PSP34Error) -> Self {
            Error::PSP34Error(psp34_error)
        }
    }

    impl From<OwnableError> for Error {
        fn from(ownable_error: OwnableError) -> Self {
            Error::OwnableError(ownable_error)
        }
    }

    impl PSP34 for NftContract {}
    impl Ownable for NftContract {}
    impl PSP34Metadata for NftContract {}

    impl psp34::Internal for NftContract {
        fn _emit_transfer_event(&self, from: Option<AccountId>, to: Option<AccountId>, id: Id) {
            self.env().emit_event(Transfer { from, to, id });
        }

        fn _emit_approval_event(
            &self,
            from: AccountId,
            to: AccountId,
            id: Option<Id>,
            approved: bool,
        ) {
            self.env().emit_event(Approval {
                from,
                to,
                id,
                approved,
            });
        }
    }

    impl NftContract {
        #[ink(constructor)]
        pub fn new(collection_name: String, collection_symbol: String) -> Self {
            let mut _instance = Self::default();
            _instance._init_with_owner(_instance.env().caller());
            let collection_id = _instance.collection_id();
            _instance._set_attribute(collection_id.clone(), String::from("name"), collection_name);
            _instance._set_attribute(collection_id, String::from("symbol"), collection_symbol);
            _instance.last_token_id = u32::default();
            _instance.mint_amount = Mapping::default();
            _instance.max_mint_amount = 3;
            _instance
        }

        #[ink(message, payable)]
        pub fn mint(&mut self) -> Result<(), Error> {
            let caller = self.env().caller();
            let curr_mint_amount = self.mint_amount.get(&caller).unwrap_or(0);
            if &curr_mint_amount + 1 > self.max_mint_amount {
                return Err(Error::MintAmountExceed(String::from(
                    "Mint amount exceed max mint value",
                )));
            }
            if self.env().transferred_value() != 1_000_000_000_000_000_000 {
                return Err(Error::FundIsNotEnough(String::from(
                    "Must transfer exactly 1 SHIB",
                )));
            }
            self.mint_amount.insert(caller, &(curr_mint_amount + 1));
            self.last_token_id = self.last_token_id + 1;
            let token_id = self.last_token_id;
            self._mint_to(self.env().caller(), Id::U32(token_id))?;
            Ok(())
        }

        #[ink(message, payable)]
        pub fn mint_many(&mut self, amount_to_mint: u32) -> Result<(), Error> {
            let caller = self.env().caller();
            let curr_mint_amount = self.mint_amount.get(&caller).unwrap_or(0);
            if &curr_mint_amount + &amount_to_mint > self.max_mint_amount {
                return Err(Error::MintAmountExceed(String::from(
                    "Mint amount exceed max mint value",
                )));
            }
            if self.env().transferred_value()
                != 1_000_000_000_000_000_000 * u128::from(amount_to_mint)
            {
                return Err(Error::FundIsNotEnough(String::from(
                    "Must transfer exactly 1 SHIB",
                )));
            }
            self.mint_amount
                .insert(caller, &(curr_mint_amount + &amount_to_mint));

            for _ in 1..=amount_to_mint {
                self.last_token_id = self.last_token_id + 1;
                let token_id = self.last_token_id;
                self._mint_to(self.env().caller(), Id::U32(token_id))?;
            }

            Ok(())
        }

        #[ink(message)]
        #[openbrush::modifiers(only_owner)]
        pub fn withdraw(&mut self) -> Result<(), Error> {
            let caller = self.env().caller();
            let contract_balance = self.env().balance();
            let result = self.env().transfer(caller, contract_balance);
            if result.is_err() {
                return Err(Error::WithdrawFailed(String::from("Withdraw Failed")));
            }
            Ok(())
        }
    }
}
