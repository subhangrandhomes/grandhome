import { Router } from "express";
import { db, propertiesTable } from "@workspace/db";
import { eq, ilike, gte, or, and, desc, count, avg } from "drizzle-orm";
import {
  ListPropertiesQueryParams,
  CreatePropertyBody,
  GetPropertyParams,
  DeletePropertyParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/properties/stats", async (req, res) => {
  try {
    const rows = await db.select().from(propertiesTable);
    const forSale = rows.filter((p) => p.mode === "buy").length;
    const forRent = rows.filter((p) => p.mode === "rent").length;
    const buyRows = rows.filter((p) => p.mode === "buy" && p.priceValue != null);
    const avgPrice =
      buyRows.length > 0
        ? Math.round(buyRows.reduce((sum, p) => sum + (p.priceValue ?? 0), 0) / buyRows.length)
        : null;
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const newListings = rows.filter((p) => new Date(p.createdAt) >= oneWeekAgo).length;

    res.json({
      totalListings: rows.length,
      forSale,
      forRent,
      avgPrice,
      newListings,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get property stats");
    res.status(500).json({ error: "Failed to get property stats" });
  }
});

router.get("/properties/featured", async (req, res) => {
  try {
    const rows = await db
      .select()
      .from(propertiesTable)
      .orderBy(desc(propertiesTable.createdAt))
      .limit(6);
    res.json(rows.map(serialize));
  } catch (err) {
    req.log.error({ err }, "Failed to get featured properties");
    res.status(500).json({ error: "Failed to get featured properties" });
  }
});

router.get("/properties", async (req, res) => {
  try {
    const parsed = ListPropertiesQueryParams.safeParse(req.query);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid query parameters" });
      return;
    }

    const { beds, type, mode, maxPrice, search } = parsed.data;

    let rows = await db.select().from(propertiesTable).orderBy(desc(propertiesTable.createdAt));

    if (beds) {
      rows = rows.filter((p) => p.beds >= beds);
    }
    if (type) {
      rows = rows.filter((p) => p.type === type);
    }
    if (mode) {
      rows = rows.filter((p) => p.mode === mode);
    }
    if (maxPrice && maxPrice > 0) {
      rows = rows.filter((p) => {
        if (p.mode === "rent") return true;
        return p.priceValue != null && p.priceValue <= maxPrice * 1000;
      });
    }
    if (search) {
      const q = search.toLowerCase();
      rows = rows.filter(
        (p) =>
          p.address.toLowerCase().includes(q) || p.name.toLowerCase().includes(q)
      );
    }

    res.json(rows.map(serialize));
  } catch (err) {
    req.log.error({ err }, "Failed to list properties");
    res.status(500).json({ error: "Failed to list properties" });
  }
});

router.post("/properties", async (req, res) => {
  try {
    const parsed = CreatePropertyBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid property data" });
      return;
    }

    const { address, price, beds, baths, sqft, type, mode, photos } = parsed.data;

    const addrShort = address.split(",")[0];
    const name = `${addrShort} — ${type}`;
    const tag = mode === "rent" ? "Rent" : "New";

    const numStr = price.replace(/[^0-9]/g, "");
    const priceValue = numStr ? parseInt(numStr, 10) : null;

    const [row] = await db
      .insert(propertiesTable)
      .values({
        name,
        address,
        price,
        priceValue,
        beds,
        baths,
        sqft,
        type,
        mode,
        tag,
        photos: JSON.stringify(photos ?? []),
      })
      .returning();

    res.status(201).json(serialize(row));
  } catch (err) {
    req.log.error({ err }, "Failed to create property");
    res.status(500).json({ error: "Failed to create property" });
  }
});

router.get("/properties/:id", async (req, res) => {
  try {
    const parsed = GetPropertyParams.safeParse({ id: Number(req.params.id) });
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }

    const [row] = await db
      .select()
      .from(propertiesTable)
      .where(eq(propertiesTable.id, parsed.data.id));

    if (!row) {
      res.status(404).json({ error: "Property not found" });
      return;
    }

    res.json(serialize(row));
  } catch (err) {
    req.log.error({ err }, "Failed to get property");
    res.status(500).json({ error: "Failed to get property" });
  }
});

router.delete("/properties/:id", async (req, res) => {
  try {
    const parsed = DeletePropertyParams.safeParse({ id: Number(req.params.id) });
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }

    const [row] = await db
      .delete(propertiesTable)
      .where(eq(propertiesTable.id, parsed.data.id))
      .returning();

    if (!row) {
      res.status(404).json({ error: "Property not found" });
      return;
    }

    res.status(204).send();
  } catch (err) {
    req.log.error({ err }, "Failed to delete property");
    res.status(500).json({ error: "Failed to delete property" });
  }
});

function serialize(p: typeof propertiesTable.$inferSelect) {
  return {
    ...p,
    photos: (() => {
      try {
        return JSON.parse(p.photos);
      } catch {
        return [];
      }
    })(),
    createdAt: p.createdAt.toISOString(),
  };
}

export default router;
