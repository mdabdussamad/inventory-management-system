import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const {
      itemId,
      supplierId,
      referenceNumber,
      addStockQty,
      receivingWarehouseId,
      notes,
    } = await request.json();    
    // Get the Item
    const itemToUpdate = await db.item.findUnique({
      where: {
        id: itemId,
      },
    });
    // console.log(itemToUpdate);
    // Current Item Quantity
    const currentItemQty = itemToUpdate.quantity;
    const newQty = parseInt(currentItemQty) + parseInt(addStockQty);
    // console.log(newQty);

    // Modify the Item to the New Qty
    const updatedItem = await db.item.update({
      where: {
        id: itemId,
      },
      data: {
        quantity: newQty,
      },
    });
    // Get the Warehouse
    const warehouse = await db.warehouse.findUnique({
      where: {
        id: receivingWarehouseId,
      },
    });
    // Current stock of the warehouse
    const currentWarehouseStock = warehouse.stockQty;
    const newStockQty =
      parseInt(currentWarehouseStock) + parseInt(addStockQty);
    // Update stock on the warehouse
    const updatedWarehouse = await db.warehouse.update({
      where: {
        id: receivingWarehouseId,
      },
      data: {
        stockQty: newStockQty,
      },
    });
    // console.log(updatedItem);
    const adjustment = await db.addStockAdjustment.create({
      data: {
        itemId,
        supplierId,
        referenceNumber,
        addStockQty: parseInt(addStockQty),
        receivingWarehouseId,
        notes,
      },
    });    
    // Affect the Warehouse
    return NextResponse.json(adjustment);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to create Adjustment",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(request) {
  try {
    const adjustments = await db.addStockAdjustment.findMany({
      orderBy: {
        createdAt: "desc", //Latest Adjustment
      },
    });
    return NextResponse.json(adjustments);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to create a Fetch the Adjustments",
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
    const deleteAdjustment = await db.addStockAdjustment.delete({
      where: {
        id,
      },
    });
    console.log(deleteAdjustment);
    return NextResponse.json(deleteAdjustment);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to Delete the Adjustment",
      },
      {
        status: 500,
      }
    );
  }
}
