import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, {params}) {
  try {
    const { id } = params;
    const brand = await db.brand.findUnique({
      where: {
        id
      },
    });
    return NextResponse.json(brand);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to create a Fetch the Brand",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(request, {params}) {
  try {
    const { id, title } = await request.json();
    // const { id, title } = params;
    const brand = await db.brand.update({
      where: {
        id,
      },
      data: {
        title
      },
    });
    console.log(brand)
    return NextResponse.json(brand);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to Update the Brand",
      },
      {
        status: 500,
      }
    );
  }
}
