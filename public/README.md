# /public assets

Static files served from the site root (`/file.ext`).

## Hero video

`<CinematicHero/>` plays **`/hero.mp4`** full-bleed behind the glass card (muted,
looping, with `/hero-poster.jpg` shown until it can play). If the file is ever
missing, the hero falls back to an animated gradient — nothing breaks.

| File | What it is |
| ---- | ---------- |
| `hero.mp4` | **Web-optimized 1080p** loop actually served to visitors (~6.5 MB). |
| `hero-4k.mp4` | The original 4K master (~64 MB), kept for re-encoding. **Not** loaded by the site. |
| `hero-poster.jpg` | First-paint poster frame (wired via the `poster` prop in `app/page.tsx`). |

### Why a separate optimized file
The 4K master is ~64 MB — far too heavy for a background loop behind a card with
overlays, where 1080p is visually identical. The optimized file loads ~10× faster.

### Re-encoding (if you swap the master)
```bash
# 1080p, no audio, faststart (streams while downloading)
ffmpeg -i hero-4k.mp4 -vf "scale=-2:1080" -c:v libx264 -profile:v high \
  -pix_fmt yuv420p -crf 24 -preset veryfast -an -movflags +faststart hero.mp4 -y

# refresh the poster (pick any content-rich timestamp)
ffmpeg -ss 4 -i hero-4k.mp4 -frames:v 1 -vf "scale=-2:1080" -q:v 4 hero-poster.jpg -y
```

To serve the full 4K instead, point the hero at it:
`<CinematicHero videoSrc="/hero-4k.mp4" poster="/hero-poster.jpg" />` in
`src/app/page.tsx` (heavier load — not recommended for production).

> Note: `next start` reads the public dir at boot — restart the server after
> adding new files here.
