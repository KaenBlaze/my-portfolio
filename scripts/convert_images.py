from PIL import Image
from pathlib import Path

root = Path(r'e:/my github/my-portfolio/src/assets')
converts = []
for sub in ['projects/screenshots', 'carousels', 'services']:
    folder = root / sub
    if not folder.exists():
        continue

    for path in folder.rglob('*'):
        if path.suffix.lower() in ['.png', '.gif']:
            out = path.with_suffix('.webp')
            try:
                if path.suffix.lower() == '.gif':
                    im = Image.open(path)
                    im = im.convert('RGBA')
                    im.save(out, 'WEBP', quality=80, method=6, lossless=False)
                else:
                    im = Image.open(path).convert('RGBA')
                    im.save(out, 'WEBP', quality=80, method=6, lossless=False)
                converts.append((path, out, out.stat().st_size))
            except Exception as e:
                print('FAILED', path, e)

print('converted', len(converts))
for src, out, size in converts:
    print(src.relative_to(root.parent), '->', out.relative_to(root.parent), size)
