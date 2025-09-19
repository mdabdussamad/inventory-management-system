import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const {
      title,
      phone,
      email,
      address,
      contactPerson,
      supplierCode,
      paymentTerms,
      taxID,
      notes,
      item,
    } = await request.json();
    const supplier = await db.supplier.create({
      data: {
        title,
        phone,
        email,
        address,
        contactPerson,
        supplierCode,
        paymentTerms,
        taxID,
        notes,
        item,
      },
    });
    console.log(supplier);
    return NextResponse.json(supplier);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to create a Supplier",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(request) {
  try {
    const suppliers = await db.supplier.findMany({
      orderBy: {
        createdAt: "desc", //Latest suppliers
      },
    });
    return NextResponse.json(suppliers);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to create a Fetch the Supplier",
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
    const deleteSupplier = await db.supplier.delete({
      where:{
        id,
      }
    })
    console.log(deleteSupplier)
    return NextResponse.json(deleteSupplier)
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        error,
        message: "Failed to Delete the Supplier",
      },
      {
        status: 500,
      }
    );
  }
}

