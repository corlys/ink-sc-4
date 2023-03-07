use crate::impls::inventory_management::types::{MarketplaceError, Detail};

#[openbrush::trait_definition]
pub trait InventoryManagement {
    #[ink(message)]
    fn run(&mut self, detail: Detail, sig_detail: [u8; 65]) -> Result<(), MarketplaceError>;
}
