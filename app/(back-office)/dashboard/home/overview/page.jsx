// import DashboardBanner from "@/components/dashboard/DashboardBanner";
// import SalesOverview from "@/components/dashboard/SalesOverview";
// import CurrentStock from "@/components/dashboard/CurrentStock";
// import { getData } from "@/lib/getData";

// export default async function Dashboard() {
//   const items = await getData("items");
//   const warehouses = await getData("warehouse");
//   return (
//     <div>
//       <DashboardBanner />
//       <SalesOverview />
//       <CurrentStock title="Available Stock Items" items={items} />
//       {
//         warehouses.map((warehouse, i)=>{
//             return(
//                 <CurrentStock key={i} title={`Available Stock Item in Warehouse ${warehouse.title}`} items={warehouse.items} />
//             )
//         })
//       }
//     </div>
//   );
// }
import DashboardBanner from "@/components/dashboard/DashboardBanner";
import SalesOverview from "@/components/dashboard/SalesOverview";
import CurrentStock from "@/components/dashboard/CurrentStock";
import { getData } from "@/lib/getData";

export default async function Dashboard() {
  const items = await getData("items");
  const warehouses = await getData("warehouse");

  // Fallback to empty arrays if data is not available
  const itemList = Array.isArray(items) ? items : [];
  const warehouseList = Array.isArray(warehouses) ? warehouses : [];

  return (
    <div>
      <DashboardBanner />
      <SalesOverview />
      <CurrentStock title="Available Stock Items" items={itemList} />
      {warehouseList.length > 0 ? (
        warehouseList.map((warehouse, i) => (
          <CurrentStock
            key={warehouse.id || i} // Prefer unique ID over index
            title={`Available Stock Item in Warehouse ${warehouse.title}`}
            items={Array.isArray(warehouse.items) ? warehouse.items : []}
          />
        ))
      ) : (
        <p>No warehouse data available.</p> // Fallback UI
      )}
    </div>
  );
}