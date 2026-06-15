import pathlib
import urllib.request

base = pathlib.Path('src/assets/projects/screenshots')
base.mkdir(parents=True, exist_ok=True)

projects = [
    ('6', 'http://127.0.0.1:4173/'),
    ('7', 'https://doctor-schedule-oz7u.vercel.app/'),
    ('8', 'https://woosignal.com/woocommerce-app/label-storemax'),
    ('9', 'https://mern-t-chat.vercel.app/chats'),
]

for pid, url in projects:
    for name, target in [
        ('main', f'https://image.thum.io/get/width/1400/crop/900/png/{url}'),
        ('detail', f'https://image.thum.io/get/width/1100/crop/700/png/{url}'),
        ('mobile', f'https://image.thum.io/get/width/390/crop/844/png/{url}'),
    ]:
        out = base / f'project-{pid}-{name}.png'
        try:
            req = urllib.request.Request(target, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=120) as r:
                data = r.read()
            out.write_bytes(data)
            print(f'downloaded {out.name}')
        except Exception as exc:
            print(f'failed {out.name}: {exc}')

print('done')
