export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import client from "../utils/db"; // Adjust the path as needed

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim();

    let query = `
      SELECT 
        r.id,
        r.title,
        r.researcher,
        r.status,
        r.progress_status,
        r.year,
        r.abstract,
        r.document,
        r.document_type,
        r.url,
        r.category,
        r.ratings,
        r.hashed_id,
        r.created_at,
        i.name AS institute,
        s.name AS school
    `;

    const params: any[] = [];

    if (search) {
      // Convert search string into an array of words
      const searchWords = search.split(/\s+/).map(word => word.toLowerCase());

      // Add match count calculation to query
      query += `,
        (
          COALESCE((
            LENGTH(LOWER(r.title || ' ' || r.researcher || ' ' || r.url || ' ' || r.category || ' ' || r.year || ' ' || r.document_type || ' ' || r.progress_status || ' ' || r.abstract)) - 
            LENGTH(REPLACE(LOWER(r.title || ' ' || r.researcher || ' ' || r.url || ' ' || r.category || ' ' || r.year || ' ' || r.document_type || ' ' || r.progress_status || ' ' || r.abstract), $1, ''))
          ) / LENGTH($1), 0)
        ) AS match_count
      `;

      query += `
        FROM researches r
        JOIN institutions i ON CAST(i.id AS TEXT) = r.institution
        JOIN schools s ON CAST(s.id AS TEXT) = r.school
      `;

      // Construct WHERE conditions for each word
      const conditions = searchWords.map((_, index) => `
        (LOWER(r.title) LIKE $${index + 1} OR 
         LOWER(r.researcher) LIKE $${index + 1} OR 
         LOWER(r.url) LIKE $${index + 1} OR 
         LOWER(r.category) LIKE $${index + 1} OR 
         LOWER(r.year) LIKE $${index + 1} OR
         LOWER(r.document_type) LIKE $${index + 1} OR
         LOWER(r.progress_status) LIKE $${index + 1} OR
         LOWER(r.abstract) LIKE $${index + 1})`
      );

      // Append conditions to query
      query += ` WHERE r.status ='Published' AND ${conditions.join(" OR ")}`;

      // Add ORDER BY match count (higher match count first)
      query += ` ORDER BY match_count DESC, r.created_at DESC`;

      // Add search parameters
      params.push(...searchWords.map(word => `%${word}%`));
    } else {
      // If no search query, return all results ordered by ID
      query += `
        FROM researches r
        JOIN institutions i ON CAST(i.id AS TEXT) = r.institution
        JOIN schools s ON CAST(s.id AS TEXT) = r.school
        WHERE r.status ='Published'
        ORDER BY r.id ASC
      `;
    }

    const result = await client.query(query, params);
    return NextResponse.json(result.rows, { status: 200 });

  } catch (error) {
    console.error("Error retrieving researches:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
