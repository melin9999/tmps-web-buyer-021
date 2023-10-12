import { NextResponse } from "next/server";

export async function POST(req){
  try{
    console.log(111);
    const body = await req.json();
    console.log(body);
    const res = await fetch("http://localhost:8000/sub-categories/find-for-category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    const response = await res.json();
    console.log(222);
    console.log(response);
    if (response.error) {
      return new NextResponse("Data error", {status: 400});
    } 
    else {
      return NextResponse.json(response);
    }
  }
  catch(error){
    return new NextResponse("Internal error", {status: 500});
  }
}