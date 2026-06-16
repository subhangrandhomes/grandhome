import { Router } from "express";

const router = Router();

router.post("/admin/verify", (req, res) => {
  const { password } = req.body as { password?: string };
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    res.status(401).json({ ok: false });
    return;
  }
  res.json({ ok: true });
});

export default router;
