use crate::impls::inventory_management::types::Detail;

#[openbrush::trait_definition]
pub trait InventoryManagement {
    #[ink(message)]
    fn run(&mut self, detail: Detail, sig_detail: [u8; 65]) -> [u8; 32];
}