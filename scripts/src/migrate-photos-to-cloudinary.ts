import { db, propertiesTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const CLOUD_NAME = "dvymbxcpd";
const UPLOAD_PRESET = "xv1ihlxx";

async function uploadBase64ToCloudinary(base64: string): Promise<string> {
  const form = new FormData();
  form.append("file", base64);
  form.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: form }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Cloudinary upload failed: ${text}`);
  }

  const data = (await res.json()) as { secure_url: string };
  return data.secure_url;
}

async function main() {
  console.log("Fetching all properties…");
  const rows = await db.select().from(propertiesTable);
  console.log(`Found ${rows.length} properties.`);

  let migrated = 0;
  let skipped = 0;

  for (const row of rows) {
    let photos: string[] = [];
    try {
      photos = JSON.parse(row.photos);
    } catch {
      skipped++;
      continue;
    }

    const needsMigration = photos.some((p) => p.startsWith("data:"));
    if (!needsMigration) {
      console.log(`  [${row.id}] "${row.name}" — already using URLs, skipping.`);
      skipped++;
      continue;
    }

    console.log(`  [${row.id}] "${row.name}" — migrating ${photos.length} photo(s)…`);

    const newPhotos: string[] = [];
    for (const photo of photos) {
      if (photo.startsWith("data:")) {
        const url = await uploadBase64ToCloudinary(photo);
        newPhotos.push(url);
        console.log(`    ✓ Uploaded → ${url}`);
      } else {
        newPhotos.push(photo);
        console.log(`    ✓ Already a URL, kept.`);
      }
    }

    await db
      .update(propertiesTable)
      .set({ photos: JSON.stringify(newPhotos) })
      .where(eq(propertiesTable.id, row.id));

    migrated++;
  }

  console.log(`\nDone. Migrated: ${migrated}, Skipped: ${skipped}.`);
  process.exit(0);
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
