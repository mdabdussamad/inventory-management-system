import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { title, location, type, description } = await request.json();
    const warehouse = await db.warehouse.create({
      data: {
        title,
        location,
        description,
        warehouseType: type,
      },
    });
    console.log(warehouse);
    return NextResponse.json(warehouse);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to create a Warehouse",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(request) {
  try {
    const warehouse = await db.warehouse.findMany({
      orderBy: {
        createdAt: "desc", //Latest warehouse
      },
      include: {
        items: true,
      },
    });
    return NextResponse.json(warehouse);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to create a Fetch the Warehouse",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(request, searchParams){
  try {
    const id = request.nextUrl.searchParams.get("id")
    const deleteWarehouse = await db.warehouse.delete({
      where:{
        id,
      },
      include:{
        item: true,
      }
    })
    console.log(deleteWarehouse)
    return NextResponse.json(deleteWarehouse)
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        error,
        message: "Failed to Delete the Warehouse",
      },
      {
        status: 500,
      }
    );
  }
}
