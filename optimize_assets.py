from pathlib import Path
from PIL import Image

ASSET_DIR = Path('/home/ubuntu/insp-auto/client/public/assets')
MAX_WIDTH = 1600
JPEG_QUALITY = 72

for source in sorted(ASSET_DIR.iterdir()):
    if source.suffix.lower() not in {'.jpg', '.jpeg', '.png'}:
        continue
    with Image.open(source) as image:
        image.load()
        if image.width > MAX_WIDTH:
            scale = MAX_WIDTH / image.width
            image = image.resize((MAX_WIDTH, round(image.height * scale)), Image.Resampling.LANCZOS)
        if source.suffix.lower() in {'.jpg', '.jpeg'}:
            image = image.convert('RGB')
            image.save(source, format='JPEG', quality=JPEG_QUALITY, optimize=True, progressive=True)
        else:
            if image.mode not in {'RGBA', 'LA'}:
                image = image.convert('RGBA')
            image.thumbnail((1200, 1200), Image.Resampling.LANCZOS)
            image = image.quantize(colors=256, method=Image.Quantize.FASTOCTREE)
            image.save(source, format='PNG', optimize=True)
        print(f'{source.name}: {source.stat().st_size} bytes')
