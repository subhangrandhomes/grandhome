import { Router } from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { db, investorsTable, investorSessionsTable, investorPropertiesTable, propertiesTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";

const router = Router();

const TOKEN_KEY = "Authorization";

async function getInvestorFromToken(authHeader: string | string[] | undefined) {
  if (Array.isArray(authHeader)) authHeader = authHeader[0];
  if (!authHeader?.startsWith("Bearer ")) return null;
  const token = authHeader.slice(7);
  const sessions = await db.select().from(investorSessionsTable).where(eq(investorSessionsTable.token, token)).limit(1);
  if (!sessions.length) return null;
  const investors = await db.select().from(investorsTable).where(eq(investorsTable.id, sessions[0].investorId)).limit(1);
  return investors[0] ?? null;
}

// Register
router.post("/investors/register", async (req, res) => {
  const { username, password } = req.body as { username?: string; password?: string };
  if (!username || !password) { res.status(400).json({ error: "Username and password are required." }); return; }
  if (username.length < 3) { res.status(400).json({ error: "Username must be at least 3 characters." }); return; }
  if (password.length < 6) { res.status(400).json({ error: "Password must be at least 6 characters." }); return; }
  const existing = await db.select().from(investorsTable).where(eq(investorsTable.username, username)).limit(1);
  if (existing.length) { res.status(409).json({ error: "Username already taken." }); return; }
  const passwordHash = await bcrypt.hash(password, 10);
  await db.insert(investorsTable).values({ username, passwordHash, status: "pending" });
  res.status(201).json({ ok: true });
});

// Login
router.post("/investors/login", async (req, res) => {
  const { username, password } = req.body as { username?: string; password?: string };
  if (!username || !password) { res.status(400).json({ error: "Username and password are required." }); return; }
  const investors = await db.select().from(investorsTable).where(eq(investorsTable.username, username)).limit(1);
  const investor = investors[0];
  if (!investor) { res.status(401).json({ error: "Invalid username or password." }); return; }
  if (investor.status === "pending") { res.status(403).json({ error: "Your account is pending admin approval." }); return; }
  if (investor.status === "rejected") { res.status(403).json({ error: "Your account request was not approved." }); return; }
  const valid = await bcrypt.compare(password, investor.passwordHash);
  if (!valid) { res.status(401).json({ error: "Invalid username or password." }); return; }
  const token = crypto.randomUUID();
  await db.insert(investorSessionsTable).values({ investorId: investor.id, token });
  res.json({ token, investor: { id: investor.id, username: investor.username } });
});

// Get current investor (token auth)
router.get("/investors/me", async (req, res) => {
  const investor = await getInvestorFromToken(req.headers[TOKEN_KEY.toLowerCase()]);
  if (!investor) { res.status(401).json({ error: "Unauthorized" }); return; }
  res.json({ id: investor.id, username: investor.username });
});

// Get investor's properties
router.get("/investors/me/properties", async (req, res) => {
  const investor = await getInvestorFromToken(req.headers[TOKEN_KEY.toLowerCase()]);
  if (!investor) { res.status(401).json({ error: "Unauthorized" }); return; }
  const rows = await db
    .select({ property: propertiesTable })
    .from(investorPropertiesTable)
    .innerJoin(propertiesTable, eq(investorPropertiesTable.propertyId, propertiesTable.id))
    .where(eq(investorPropertiesTable.investorId, investor.id));
  res.json(rows.map((r) => ({ ...r.property, photos: JSON.parse(r.property.photos ?? "[]") as string[] })));
});

// ── Admin: list all investors
router.get("/admin/investors", (req, res, next) => {
  const pw = (req.headers["x-admin-password"] as string | undefined);
  if (!pw || pw !== process.env.ADMIN_PASSWORD) { res.status(401).json({ error: "Unauthorized" }); return; }
  next();
}, async (_req, res) => {
  const investors = await db.select().from(investorsTable).orderBy(investorsTable.createdAt);
  res.json(investors.map((i) => ({ id: i.id, username: i.username, status: i.status, createdAt: i.createdAt })));
});

// Admin: approve investor
router.put("/admin/investors/:id/approve", (req, res, next) => {
  const pw = (req.headers["x-admin-password"] as string | undefined);
  if (!pw || pw !== process.env.ADMIN_PASSWORD) { res.status(401).json({ error: "Unauthorized" }); return; }
  next();
}, async (req, res) => {
  const id = parseInt(req.params.id);
  await db.update(investorsTable).set({ status: "approved" }).where(eq(investorsTable.id, id));
  res.json({ ok: true });
});

// Admin: reject investor
router.put("/admin/investors/:id/reject", (req, res, next) => {
  const pw = (req.headers["x-admin-password"] as string | undefined);
  if (!pw || pw !== process.env.ADMIN_PASSWORD) { res.status(401).json({ error: "Unauthorized" }); return; }
  next();
}, async (req, res) => {
  const id = parseInt(req.params.id);
  await db.update(investorsTable).set({ status: "rejected" }).where(eq(investorsTable.id, id));
  res.json({ ok: true });
});

// Admin: get investor's assigned properties
router.get("/admin/investors/:id/properties", (req, res, next) => {
  const pw = (req.headers["x-admin-password"] as string | undefined);
  if (!pw || pw !== process.env.ADMIN_PASSWORD) { res.status(401).json({ error: "Unauthorized" }); return; }
  next();
}, async (req, res) => {
  const id = parseInt(req.params.id);
  const rows = await db
    .select({ property: propertiesTable })
    .from(investorPropertiesTable)
    .innerJoin(propertiesTable, eq(investorPropertiesTable.propertyId, propertiesTable.id))
    .where(eq(investorPropertiesTable.investorId, id));
  res.json(rows.map((r) => r.property.id));
});

// Admin: assign property to investor
router.post("/admin/investors/:id/properties", (req, res, next) => {
  const pw = (req.headers["x-admin-password"] as string | undefined);
  if (!pw || pw !== process.env.ADMIN_PASSWORD) { res.status(401).json({ error: "Unauthorized" }); return; }
  next();
}, async (req, res) => {
  const investorId = parseInt(req.params.id);
  const { propertyId } = req.body as { propertyId: number };
  await db.insert(investorPropertiesTable).values({ investorId, propertyId }).onConflictDoNothing();
  res.json({ ok: true });
});

// Admin: unassign property from investor
router.delete("/admin/investors/:id/properties/:propertyId", (req, res, next) => {
  const pw = (req.headers["x-admin-password"] as string | undefined);
  if (!pw || pw !== process.env.ADMIN_PASSWORD) { res.status(401).json({ error: "Unauthorized" }); return; }
  next();
}, async (req, res) => {
  const investorId = parseInt(req.params.id);
  const propertyId = parseInt(req.params.propertyId);
  await db.delete(investorPropertiesTable).where(
    and(eq(investorPropertiesTable.investorId, investorId), eq(investorPropertiesTable.propertyId, propertyId))
  );
  res.json({ ok: true });
});

export default router;
