import { NextRequest, NextResponse } from "next/server";

import { sendCeoContactCopyEmail, sendContactCopyEmail, sendContactEmail} from "../../utils/config";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
      const body = await req.json(); // Correct way to parse JSON data
  
      const { name, email, message } = body;
  
      if (!name || !email || !message) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
      }



    const send = await sendContactEmail(email, message, name);
    const sendCopy = await sendContactCopyEmail(email, message, name);
    const sendCeoCopy = await sendCeoContactCopyEmail(email, message, name);
    
    return NextResponse.json(
      { message: "Message sent successfully", send, sendCopy, sendCeoCopy},
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
