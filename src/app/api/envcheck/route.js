// Temporary: confirms required env vars exist in each environment. Deleted after checking.
export const dynamic = "force-dynamic";
export async function GET() {
  const s = process.env.SESSION_SECRET;
  return Response.json({
    hasMongoUri: !!process.env.MONGODB_URI,
    hasMongoDb: !!process.env.MONGODB_DB,
    hasSessionSecret: !!s,
    sessionSecretLongEnough: !!s && s.length >= 32,
  });
}
