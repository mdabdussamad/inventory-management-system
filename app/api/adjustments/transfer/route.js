import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const {
      transferStockQty,
      itemId,
      referenceNumber,
      givingWarehouseId,
      receivingWarehouseId,
      notes,
    } = await request.json();

    const item = await db.item.findUnique({
        where: {
          id: itemId,
        }
      })

    // The Giving Warehouse
    const givingWarehouse = await db.warehouse.findUnique({
      where: {
        id: givingWarehouseId,
      },
    });

    // Get Current Sock
    const currentGivingWarehouseStock = givingWarehouse.stockQty;

    if (parseInt(currentGivingWarehouseStock) > parseInt(transferStockQty)) {
      const newStockForGivingWarehouse =
        parseInt(currentGivingWarehouseStock) - parseInt(transferStockQty);

      // Update stock
      const updatedGivingWarehouse = await db.warehouse.update({
        where: {
          id: givingWarehouseId,
        },
        data: {
          stockQty: newStockForGivingWarehouse,
        },
      });
      // Update the item in the giving warehouse
      const updatedItemInGivingWarehouse = await db.item.update({
        where: {
          id: itemId,
        },
        data: {
          warehouseId: givingWarehouseId,  // Make sure to update the warehouse Id if it is not the same
          quantity: newStockForGivingWarehouse,
        },
      });

      // Get the receiving warehouse
      const receivingWarehouse = await db.warehouse.findUnique({
        where: {
          id: receivingWarehouseId,
        },
      });

      // Get Current Sock
      const currentReceivingWarehouseStock = receivingWarehouse.stockQty;

      const newStockForReceivingWarehouse =
        parseInt(currentReceivingWarehouseStock) + parseInt(transferStockQty);

      // Update stock
      const updatedReceivingWarehouse = await db.warehouse.update({
        where: {
          id: receivingWarehouseId,
        },
        data: {
          stockQty: newStockForReceivingWarehouse,          
        },
      });

      // Update the item in the receiving warehouse
      const updatedItemInReceivingWarehouse = await db.item.update({
        where: {
          id: itemId,
        },
        data: {
          warehouseId: receivingWarehouseId,     // Make sure to update the warehouse Id if it is not the same
          quantity: newStockForReceivingWarehouse,     
        },
      });

      // UPDATE THE ITEM IN BOTH WAREHOUSES
      // Item in the Giving Warehouse     
      

      const adjustment = await db.transferStockAdjustment.create({
        data: {
          itemId,
          referenceNumber,
          transferStockQty: parseInt(transferStockQty),
          givingWarehouseId,
          receivingWarehouseId,
          notes,
        },
      });
      console.log(adjustment);
      return NextResponse.json(adjustment);
    } else {
      return NextResponse.json(
        {
          data: null,
          message: "Giving warehouse has no enough stock",
        },
        { status: 409 }
      );
    }
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
    const adjustments = await db.transferStockAdjustment.findMany({
      orderBy: {
        createdAt: "desc", //Latest Adjustments
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
    const deleteAdjustment = await db.transferStockAdjustment.delete({
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
