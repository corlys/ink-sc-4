use crate::impls::inventory_management::types::Detail;
use openbrush::traits::AccountId;
#[openbrush::trait_definition]
pub trait InventoryManagement {
    #[ink(message)]
    fn run(&mut self, detail: Detail, sig_detail: [u8; 65]) -> AccountId;
    #[ink(message)]
    fn hash(&mut self, detail: Detail) -> [u8; 32];
    #[ink(message)]
    fn verify(&mut self, detail: Detail, signer: AccountId, signature: [u8; 65]) -> bool;
}
