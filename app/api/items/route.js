import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const itemData = await request.json();
    // Get the Warehouse
    const warehouse = await db.warehouse.findUnique({
      where: {
        id: itemData.warehouseId,
      },
    });
    // Current stock of the warehouse
    const currentWarehouseStock = warehouse.stockQty;
    const newStockQty = parseInt(currentWarehouseStock) + parseInt(itemData.qty)
    // Update stock on the warehouse
    const updatedWarehouse = await db.warehouse.update({
      where: {
        id: itemData.warehouseId,
      },
      data:{
        stockQty: newStockQty,
      },
    });
    const item = await db.item.create({
      data: {
        title: itemData.title,
        categoryId: itemData.categoryId,
        sku: itemData.sku,
        barcode: itemData.barcode,
        quantity: parseInt(itemData.qty),
        unitId: itemData.unitId,
        brandId: itemData.brandId,
        supplierId: itemData.supplierId,
        buyingPrice: parseFloat(itemData.buyingPrice),
        sellingPrice: parseFloat(itemData.sellingPrice),
        reOrderPoint: parseInt(itemData.reOrderPoint),
        warehouseId: itemData.warehouseId,
        imageUrl: itemData.imageUrl,
        weight: parseFloat(itemData.weight),
        dimensions: itemData.dimensions,
        taxRate: parseFloat(itemData.taxRate),
        description: itemData.description,
        notes: itemData.notes,
      },
    });
    return NextResponse.json(item);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to create a Item",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(request) {
  try {
    const items = await db.item.findMany({
      orderBy: {
        createdAt: "desc", //Latest units
      },
      include: {
        category: true, //Returns all fields for all categories
        warehouse: true, //Returns all fields for all Warehouse
      },
    });
    return NextResponse.json(items);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to create a Fetch the Items",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(request, searchParams) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    const deleteItem = await db.item.delete({
      where: {
        id,
      },
    });
    console.log(deleteItem);
    return NextResponse.json(deleteItem);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to Delete the Item",
      },
      {
        status: 500,
      }
    );
  }
}
