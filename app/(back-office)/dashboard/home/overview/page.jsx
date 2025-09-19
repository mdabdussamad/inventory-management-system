import DashboardBanner from "@/components/dashboard/DashboardBanner";
import SalesOverview from "@/components/dashboard/SalesOverview";
import CurrentStock from "@/components/dashboard/CurrentStock";
import { getData } from "@/lib/getData";


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
export default async function Dashboard() {
  const items = await getData("items");
  const warehouses = await getData("warehouse");
  
  console.log("Warehouses:", warehouses); // Check console for this output

  return (
    <div>
      <DashboardBanner />
      <SalesOverview />
      <CurrentStock title="Available Stock Items" items={items} />
      
      {/* Simplified mapping with safety checks */}
      {Array.isArray(warehouses) && warehouses.map((warehouse, i) => (
        <div key={i}>
          <h3>Warehouse: {warehouse?.title}</h3>
          <CurrentStock 
            title={`Available Stock Item in Warehouse ${warehouse?.title}`} 
            items={warehouse?.items || []} 
          />
        </div>
      ))}
    </div>
  );
}