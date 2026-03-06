import { NextResponse } from "next/server";
import nodamailer from "nodemailer";

export async function POST(req: Request) {
    const { email } = await req.json();

    try {
        const transporter = nodamailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const message = `
            <div style="background:#f5f7fb;padding:40px 20px;font-family:Arial,Helvetica,sans-serif;">
            
                <div style="max-width:600px;margin:auto;background:white;border-radius:12px;padding:40px;box-shadow:0 10px 25px rgba(0,0,0,0.08);">

                    <div style="text-align:center;margin-bottom:30px;">
                        <h2 style="color:#4f46e5;margin:0;">Content Administrator</h2>
                        <p style="color:#6b7280;font-size:14px;margin-top:6px;">
                            Solicitud de recuperación de contraseña
                        </p>
                    </div>

                    <div style="text-align:center;font-size:40px;margin-bottom:10px;">🔐</div>

                    <h3 style="text-align:center;color:#111827;margin-bottom:20px;">
                        Un usuario olvidó su contraseña
                    </h3>

                    <p style="color:#374151;font-size:15px;line-height:1.6;">
                        Hola equipo,
                    </p>

                    <p style="color:#374151;font-size:15px;line-height:1.6;">
                        El usuario con el correo:
                    </p>

                    <div style="
                        background:#f3f4f6;
                        padding:14px;
                        border-radius:8px;
                        text-align:center;
                        font-weight:bold;
                        color:#111827;
                        margin:15px 0;
                        font-size:15px;
                    ">
                        ${email}
                    </div>

                    <p style="color:#374151;font-size:15px;line-height:1.6;">
                        indicó que olvidó su contraseña y necesita ayuda para recuperar el acceso
                        a la plataforma.
                    </p>

                    <p style="color:#374151;font-size:15px;line-height:1.6;">
                        Por favor revisen su cuenta y ayúdenlo a restablecer su contraseña lo antes posible.
                    </p>

                    <div style="
                        margin-top:30px;
                        padding-top:20px;
                        border-top:1px solid #e5e7eb;
                        text-align:center;
                        font-size:12px;
                        color:#9ca3af;
                    ">
                        Este mensaje fue generado automáticamente desde el sistema
                        <strong>Content Administrator</strong>.
                    </div>

                </div>

            </div>
            `;

        await transporter.sendMail({
            from: {
                name: "Books & Books Digital | Content Admin",
                address: process.env.EMAIL_USER as string,
            },
            to: "programador@booksandbooksdigital.com.co",
            subject: "Solicitud de recuperación de contraseña",
            html: message,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "No se pudo enviar el correo" }, { status: 500 });
    }
}