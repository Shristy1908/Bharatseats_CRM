export const APIEndpoints = {
  Home: {
    GetCategorymaster: "Brand/setup/GetCategorymaster",
    GetYearmaster: "Brand/Setup/GetYearmaster",
    GetYearwiseTopbrand: "Brand/Setup/GetYearwiseTopbrand",
  },
  Contact: {
    SendMail: "Brand/Setup/SendMail",
  },
  Category: {
    GetCategorymaster: "Brand/setup/GetCategorymaster",
    AddCategoryMaster: "Brand/Setup/AddCategoryMaster",
    UpdateCategoryMaster: "Brand/Setup/UpdateCategoryMaster",
    UpdateCategoryStatus: "Brand/Setup/UpdateCategoryStatus",
  },
  Brand: {
    GetBrandmaster: "Brand/Setup/GetBrandmaster",
    AddBrandMaster: "Brand/Setup/AddBrandMaster",
    UpdateBrandMaster: "Brand/Setup/UpdateBrandMaster",
    UpdateBrandStatus: "Brand/Setup/UpdateBrandStatus",
  },
  BrandModel: {
    GetBrandSKU: "Brand/Setup/GetBrandSKU",
    AddBrandSKU: "Brand/Setup/AddBrandSKU",
    UpdateBrandSKU: "Brand/Setup/UpdateBrandSKU",
    UpdateBrandSKUStatus: "Brand/Setup/UpdateBrandSKUStatus",
    GetBrandimages: "Brand/Setup/GetBrandimages",
    AddBrandimages: "Brand/Setup/AddBrandimages",
    DeleteBrandimages: "Brand/Setup/DeleteBrandimages",
  },
  BrandAwards: {
    GetBrand_Category: "Brand/Setup/GetBrand_Category",
    AddBrandCategoryMaster: "Brand/Setup/AddBrandCategoryMaster",
    UpdateBrandCategoryMaster: "Brand/Setup/UpdateBrandCategoryMaster",
  },
};

export default APIEndpoints;
