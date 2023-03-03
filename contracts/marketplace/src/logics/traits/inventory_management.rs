use crate::impls::inventory_management::types::MarketplaceError;

#[openbrush::trait_definition]
pub trait InventoryManagement {
    #[ink(message)]
    fn run(&mut self) -> Result<(), MarketplaceError>;
}
