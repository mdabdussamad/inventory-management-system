import CreateItemForm from "@/components/dashboard/CreateItemForm";
import FormHeader from "@/components/dashboard/FormHeader";
import { getData } from "@/lib/getData";

export default async function NewItem({ initialData = {}, isUpdate = false }) {
  // Sequencial Fetching => Waterfall
  const categoriesData = getData("categories");
  const unitsData = getData("units");
  const brandsData = getData("brands");
  const warehousesData = getData("warehouse");
  const suppliersData = getData("suppliers");

  // Parallel Fetching
  const [categories, units, brands, warehouse, suppliers] = await Promise.all([
    categoriesData,
    unitsData,
    brandsData,
    warehousesData,
    suppliersData,
  ]);

  return (
    <div>
      {/* Header */}
      <FormHeader
        title={isUpdate ? "Update Item" : "New Item"}
        href="/dashboard/inventory/items"
      />
      {/* Form */}
      {/*  */}
      <CreateItemForm
        categories={categories}
        units={units}
        brands={brands}
        warehouses={warehouse}
        suppliers={suppliers}
        initialData={initialData}
        isUpdate={isUpdate}
      />
    </div>
  );
}
