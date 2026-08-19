from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
src = root / "client/public/assets/insp-auto-logo-clean.png"
out_png = root / "client/public/favicon.png"
out_ico = root / "client/public/favicon.ico"

logo = Image.open(src).convert("RGBA")
# The supplied logo's upper emblem occupies this region; the wordmark begins below it.
crop = logo.crop((360, 120, 900, 470))

# Fit the emblem into a square with a clean white matte for reliable tab contrast.
side = max(crop.size)
canvas = Image.new("RGBA", (side, side), (255, 255, 255, 255))
canvas.alpha_composite(crop, ((side - crop.width) // 2, (side - crop.height) // 2))

favicon = canvas.resize((256, 256), Image.Resampling.LANCZOS).convert("RGB")
favicon.save(out_png, format="PNG", optimize=True)
favicon.save(out_ico, format="ICO", sizes=[(16, 16), (32, 32), (48, 48), (256, 256)])
print(f"wrote {out_png} and {out_ico}")
