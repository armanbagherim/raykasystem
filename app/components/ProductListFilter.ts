export default interface ProductListFilter {
  brandId?: number;
  entityTypeId?: number;
  inventoryStatusId?: number;
  offset?: number;
  limit?: number;
  orderBy?: string;
  sortOrder?: string;
  discountTypeId: number;
}
