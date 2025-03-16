import { NextRequest, NextResponse } from "next/server";
import client from "../../../utils/db";

// Define types for the verify request
type VerifyRequest = {
  code: string;
  hashed_id: string;
};

// Handle POST request for verification
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const formData = await req.formData();
    const verifyData: VerifyRequest = {
      code: formData.get("code")?.toString() || "",
      hashed_id: formData.get("hashed_id")?.toString() || "",
    };

    console.log("Received data: ", verifyData); // Debugging log

    // Validate required fields
    if (!verifyData.code || !verifyData.hashed_id) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Check if the code exists in the database
    const checkQuery = `SELECT * FROM students WHERE hashed_id = $1 AND verification_code = $2`;
    const checkResult = await client.query(checkQuery, [verifyData.hashed_id, verifyData.code]);

    if (checkResult.rowCount === 0) {
      return NextResponse.json({ error: "Invalid verification code" }, { status: 400 });
    }

    // If code exists, update the status to "Active"
    const updateQuery = `UPDATE students SET status = $1 WHERE hashed_id = $2`;
    await client.query(updateQuery, ["Active", verifyData.hashed_id]);

    return NextResponse.json({ message: "Verified successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error during verification:", error);
    return NextResponse.json({ message: "Verification failed", error: (error as Error).message }, { status: 500 });
  }
}
