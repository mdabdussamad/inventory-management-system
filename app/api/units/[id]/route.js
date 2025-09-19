import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const unit = await db.unit.findUnique({
      where: {
        id,
      },
    });
    return NextResponse.json(unit);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to create a Fetch the Unit",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(request, { params }) {
  try {    
    const {id, title, abbreviation } = await request.json(); 
    const unit = await db.unit.update({
      where: {
        id,
      },
      data: {
        title,
        abbreviation,
      },
    });
    console.log(unit);
    return NextResponse.json(unit);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to Update the Unit",
      },
      {
        status: 500,
      }
    );
  }
}
