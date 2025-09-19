import DataTable from "@/components/dashboard/DataTable";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";

export default async function Warehouse() {
    const warehouse = await getData("warehouse")   
    const columns = ["title", "location", "description", "warehouseType"]
  return (
    <div>
      {/* Header */}
      <FixedHeader
        title="Warehouse"
        newLink="/dashboard/inventory/warehouse/new"
      />
      {/* Table */}
      <div className="my-4 p-8">
        <DataTable data={warehouse} columns={columns} resourceTitle="warehouse" />
      </div>
    </div>
  );
}
