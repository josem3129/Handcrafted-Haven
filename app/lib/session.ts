"server-only"
import { SignJWT, jwtVerify } from "jose";
import { SessionPayload } from "@/app/lib/definitions";
import { cookies } from "next/headers";
import { sql } from "@vercel/postgres";
import { json } from "stream/consumers";


const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("259200 sec from now")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });

    console.log(`----payload ${JSON.stringify(payload)}`);
    
    return payload;
  } catch (error) {
    console.log(`Failed to verify session ${error}`);
  }
}



export async function createSession(id: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({id, expiresAt});  
  (
    await cookies()
  ).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
  
  try {

    const check = await sql`
    SELECT EXISTS (
    SELECT 2
    FROM jwt_tokens
    WHERE id = 2);
    `
    console.log(`---------------------------------------------------${check}`);
    
    if (!check) {
      console.log('false');
      
      await sql`
        INSERT INTO jwt_tokens (token, user_id)
        VALUES (${session}, ${id})
      `;
    }else{
      console.log('true');
      
      await sql`
      UPDATE jwt_tokens
      SET token = ${session}, user_id = ${id}
      WHERE id = 2
    `;
    }
      } catch (error) {
        return {
          message: 'Database Error: Failed to Create listing.',
        };
  }
}

export async function getSession() {
  const session = await sql`
  SELECT  token
      FROM jwt_tokens
      WHERE jwt_tokens.id = 2
  `
  console.log(session.rows[0].token);
  
  if (!session) return null;
  return await decrypt(JSON.parse(JSON.stringify(session.rows[0].token)));
}

