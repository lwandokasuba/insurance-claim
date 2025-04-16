import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const user = await fetch(`${process.env.EXPRESS_API_URL}/users/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error creating user:", error);
      return null;
    });

  return NextResponse.json(user, { status: 201 });
}
