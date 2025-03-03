import { NextRequest, NextResponse } from "next/server";

import { sendContactCopyEmail, sendContactEmail} from "../../utils/config";

type StudentRequest = {
  name: string;
  message: string;
  email: string;
};




export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
      const body = await req.json(); // Correct way to parse JSON data
  
      const { name, email, message } = body;
  
      if (!name || !email || !message) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
      }



    const send = await sendContactEmail(email, message, name);
    const sendCopy = await sendContactCopyEmail(email, message, name);
    
    return NextResponse.json(
      { message: "Message sent successfully", send, sendCopy},
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during messaging:", error);
    return NextResponse.json(
      { message: "Failed to send", error: (error as Error).message },
      { status: 500 }
    );
  }
}
