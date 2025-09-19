import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function SalesActivityCard({ item }) {
  return (
    <Link
      href={item.href}
      className="shadow rounded-lg border border-slate-200 hover:border-blue-40 bg-white px-3 py-4 cursor-pointer flex flex-col items-center gap-3 transition-all duration-300 ease-in-out hover:bg-slate-100"
    >
      <h4 className={`font-semibold text-3xl ${item.color}`}>{item.number}</h4>
      {/* <small className="text-slate-500">{item.unit}</small> */}
      <div className="flex items-center space-x-2">
        <CheckCircle2 className="w-4 h-4" />
        <span className="uppercase text-slate-500 text-xs">{item.title}</span>
      </div>
    </Link>
  );
}
