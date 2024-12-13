"server-only";
import { SignJWT, jwtVerify } from "jose";
import { SessionPayload } from "@/app/lib/definitions";
import { cookies } from "next/headers";
import { authConfig } from "@/auth.config";
import { sql } from "@vercel/postgres";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("300 sec from now")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log(`Failed to verify session ${error}`);
    return authConfig
  }
}

export async function createSession(name: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ name,expiresAt});
  await (
    await cookies()
  ).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  try {
    await sql`
      INSERT INTO jwt_tokens (token, user_id)
      VALUES (${session}, ${name})
    `;
      } catch (error) {
        return {
          message: 'Database Error: Failed to Create listing.',
        };
  }
}

export async function getSession() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}
