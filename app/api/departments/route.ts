import { NextResponse } from "next/server";
import client from "../utils/db"; // Adjust the path as needed

export async function  GET(req: Request) {
 
  try {

    let query = `SELECT 
      d.id,
      d.name,
      d.label,
      d.status,
      d.created_at,
      i.name AS institute,
      c.name AS college,
      s.name AS school
      FROM departments d
      JOIN schools s ON CAST(s.id AS TEXT) = d.school
      JOIN colleges c ON CAST(c.id AS TEXT) = s.college
      JOIN institutions i ON CAST(i.id AS TEXT) = c.institution 
      ORDER BY d.name ASC
      `;

    const result = await client.query(query);

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("Error retrieving departments:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
