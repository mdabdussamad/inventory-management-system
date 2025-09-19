import FixedHeader from "@/components/dashboard/FixedHeader";
import OptionCard from "@/components/dashboard/OptionCard";
import { Diff, Factory, Layout, LayoutGrid, Scale,  Target, Warehouse } from "lucide-react";

export default function Inventory() {
  const optionCards = [   
    {
      title: "Items",
      description: "Create standalone items and services that you buy and sell",
      link: "/dashboard/inventory/items/new",
      linkTitle: "New Item",
      enabled: true,
      icon: LayoutGrid,
    },
    {
      title: "Categories",
      description: "Group different items together and sell them as a single item",
      link: "/dashboard/inventory/categories/new",
      linkTitle: "New Category",
      enabled: true,
      icon: Layout,
    },
     {
      title: "Brands",
      description: "Tweak your item prices for specific contacts or transactions",
      link: "/dashboard/inventory/brands/new",
      linkTitle: "New Brand",
      enabled: true,
      icon: Target,
    },
    {
      title: "Warehouse",
      description: "Tweak your item prices for specific contacts or transactions",
      link: "/dashboard/inventory/warehouse/new",
      linkTitle: "New Warehouse",
      enabled: true,
      icon: Warehouse,
    },
    {
      title: "Units",
      description: "Tweak your item prices for specific contacts or transactions",
      link: "/dashboard/inventory/units/new",
      linkTitle: "New Unit",
      enabled: true,
      icon: Scale,
    },{
      title: "Suppliers",
      description: "Tweak your item prices for specific contacts or transactions",
      link: "/dashboard/inventory/suppliers/new",
      linkTitle: "New Supplier",
      enabled: true,
      icon: Factory,
    },
    {
      title: "Inventory Adjustments",
      description: "Transfer Stock from the main warehouse to a branch",
      link: "/dashboard/inventory/adjustments/new",
      linkTitle: "New Adjustment",
      enabled: true,
      icon: Diff,
    },
  ];
  return (
    <div>
      <FixedHeader newLink="/dashboard/inventory/items/new" />
      <div className="grid grid-col-1 lg:grid-cols-3 md:grid-cols-2 px-16 py-8 gap-6">
        {optionCards.map((card, i) => (
          <OptionCard key={i} optionData={card} />
        ))}
      </div>
    </div>
  );
}
