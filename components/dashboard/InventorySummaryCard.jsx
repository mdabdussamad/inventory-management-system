export default function InventorySummaryCard({ item }) {
  return (
    <div      
      className="mb-4 shadow rounded-lg border border-slate-200 hover:border-blue-40 bg-white py-2 px-4 cursor-pointer flex items-center gap-3 justify-between transition-all duration-300 ease-in-out hover:bg-slate-100"
    >
      <h2 className="uppercase text-slate-500 text-sm">{item.title}</h2>
      <h4 className="text-2xl">{item.number}</h4>
    </div>
  );
}
