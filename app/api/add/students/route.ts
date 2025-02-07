import { NextRequest, NextResponse } from "next/server";

import client from "../../utils/db";
const cloudinary = require('../../utils/cloudinary');
const fs = require('fs');
const path = require('path');
const os = require('os'); // Import os to get the temporary directory

import { sendVerificationEmail } from "../../utils/config";

type StudentRequest = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  department: string;
  profilePicture: File;
};

async function hashPassword(password: string): Promise<string> {
    const textEncoder = new TextEncoder();
    const encoded = textEncoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function uploadProfilePictureToCloudinary(file: File): Promise<string> {
  const tempDir = os.tmpdir();
  const profilePicturePath = path.join(tempDir, file.name);
  const buffer = await file.arrayBuffer();
  fs.writeFileSync(profilePicturePath, Buffer.from(buffer));

  const uploadResult = await cloudinary.uploader.upload(profilePicturePath, {
    use_filename: true,
    folder: "students/profile_pictures",
  });

  fs.unlinkSync(profilePicturePath);
  return uploadResult.secure_url;
}

function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function hashId(id: number): Promise<string> {
  const textEncoder = new TextEncoder();
  const encoded = textEncoder.encode(id.toString());
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const formData = await req.formData();
    const studentData: StudentRequest = {
      first_name: formData.get("first_name")?.toString() || "",
      last_name: formData.get("last_name")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      phone: formData.get("phone")?.toString() || "",
      password: formData.get("password")?.toString() || "",
      department: formData.get("department")?.toString() || "",
      profilePicture: formData.get("profilePicture") as File,
    };


    if (
      !studentData.first_name ||
      !studentData.last_name ||
      !studentData.email ||
      !studentData.password ||
      !studentData.department ||
      !studentData.phone
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const existingStudentEmail = await client.query(
      "SELECT id FROM students WHERE email = $1",
      [studentData.email]
    );
    const existingStudentPhone = await client.query(
      "SELECT id FROM students WHERE phone = $1",
      [studentData.phone]
    );

    if (existingStudentEmail.rows.length > 0) {
      return NextResponse.json(
        { error: "Email is already registered" },
        { status: 400 }
      );
    }

    if (existingStudentPhone.rows.length > 0) {
      return NextResponse.json(
        { error: "Phone is already registered" },
        { status: 400 }
      );
    }

    const profilePicture = await uploadProfilePictureToCloudinary(studentData.profilePicture);
    const status = "Unverified";
    const verificationCode = generateVerificationCode();
    const hashedPassword = await hashPassword(studentData.password);

    const result = await client.query(
      `INSERT INTO students (first_name, last_name, email, status, phone, department, password, profile_picture, hashed_id, verification_code, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW()) RETURNING id`,
      [
        studentData.first_name,
        studentData.last_name,
        studentData.email,
        status,
        studentData.phone,
        studentData.department,
        hashedPassword,
        profilePicture,
        null,
        verificationCode,
      ]
    );

    const studentId = result.rows[0].id;
    const hashedStudentId = await hashId(studentId);

    await client.query(`UPDATE students SET hashed_id = $1 WHERE id = $2`, [
      hashedStudentId,
      studentId,
    ]);

    await sendVerificationEmail(studentData.email, verificationCode, studentData.first_name);

    return NextResponse.json(
      { message: "Student added successfully", student: { id: studentId, hashed_id: hashedStudentId, email: studentData.email } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during student addition:", error);
    return NextResponse.json(
      { message: "Student addition failed", error: (error as Error).message },
      { status: 500 }
    );
  }
}
