import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, {params}) {
  try {
    const { id } = params;
    const category = await db.category.findUnique({
      where: {
        id
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to create a Fetch the Category",
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
    const category = await db.category.update({
      where: {
        id
      },
      data: {
        title
      },
    });
    console.log(category)
    return NextResponse.json(category);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to Update the Category",
      },
      {
        status: 500,
      }
    );
  }
}
