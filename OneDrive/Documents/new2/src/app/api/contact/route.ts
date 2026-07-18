import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(3),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parseResult = contactSchema.safeParse(body);

  if (!parseResult.success) {
    return NextResponse.json({ message: "Invalid input.", errors: parseResult.error.flatten() }, { status: 400 });
  }

  const { name, email, phone, subject, message } = parseResult.data;

  try {
    // Save contact to database
    const record = await prisma.contact.create({
      data: {
        name,
        email,
        phone: phone ?? null,
        subject,
        message,
        status: "Pending",
      },
    });

    // Optionally send email notification if SMTP configured
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      try {
        await transporter.sendMail({
          from: `${name} <${email}>`,
          to: process.env.CONTACT_EMAIL ?? process.env.SMTP_USER,
          subject: `[Portfolio Contact] ${subject}`,
          text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone ?? "-"}\n\n${message}`,
          html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone ?? "-"}</p><p><strong>Message:</strong></p><p>${message}</p>`,
        });
      } catch {
        // swallow email errors but keep DB record
      }
    }

    return NextResponse.json({ message: "Message saved successfully.", data: { id: record.id } });
  } catch {
    return NextResponse.json({ message: "Unable to save message." }, { status: 500 });
  }
}
