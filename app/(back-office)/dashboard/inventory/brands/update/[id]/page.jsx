import { getData } from "@/lib/getData";
import NewBrand from "../../new/page";

export default async function Update({params:{id}}) {
    const data = await getData(`brands/${id}`)
    console.log(data)
    return (
        <NewBrand initialData={data} isUpdate={true} />
    )
}
