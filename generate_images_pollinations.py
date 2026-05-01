#!/usr/bin/env python3
"""Free image generation via pollinations.ai (FLUX) — no quota, no auth.
Fallback when Gemini quota is exhausted.
"""
import os
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent
IMG_DIR = ROOT / "public" / "images"

STYLE = (
    "interior photography, magazine quality, natural soft daylight, premium real estate, "
    "modern minimalist scandinavian style, professional architectural photography, no people, "
    "sharp focus, clean composition, warm neutral palette with single accent color, "
    "shot on full-frame camera with 35mm lens, depth of field, editorial photography"
)

# (filename, width, height, prompt_addition)
PROMPTS = [
    ("hero/main.jpg", 1920, 1080,
     "wide shot of a bright contemporary living room with a perfectly flat matte white "
     "stretch ceiling with hidden LED cove lighting around perimeter, large floor-to-ceiling windows, "
     "linen curtains, light oak parquet, sculptural sofa in cream boucle, "
     "single tall vase with eucalyptus branches"),

    ("types/01-matte.jpg", 1280, 960,
     "cozy bedroom with matte white stretch ceiling, queen bed with linen bedding, "
     "two bedside lamps with warm soft glow, ceiling crisp matte white surface clearly visible"),
    ("types/02-glossy.jpg", 1280, 960,
     "modern living room with high-gloss black stretch ceiling reflecting warm pendant lights, "
     "deep dark glossy mirror surface, dramatic premium aesthetic, leather armchair, brass fixtures"),
    ("types/03-satin.jpg", 1280, 960,
     "elegant dining room with satin champagne beige stretch ceiling, soft pearlescent finish, "
     "large modern chandelier in center, oval wood table with six chairs, golden hour light"),
    ("types/04-photoprint.jpg", 1280, 960,
     "child bedroom with stretch ceiling featuring large photo print of soft cumulus clouds against blue sky, "
     "single bed with plush toys, kid-friendly cozy atmosphere, ceiling print is the focal point"),
    ("types/05-twolevel.jpg", 1280, 960,
     "modern living room with two level stretch ceiling, lower outer ring matte white, "
     "raised inner rectangle with hidden LED perimeter lighting, geometric architectural feature"),
    ("types/06-floating.jpg", 1280, 960,
     "modern kitchen with floating stretch ceiling, continuous LED light strip around perimeter "
     "creating illusion ceiling is hovering, sleek handleless cabinets, marble island"),
    ("types/07-fabric.jpg", 1280, 960,
     "home office with woven fabric stretch ceiling in warm beige tone, subtle texture visible, "
     "wooden desk, leather chair, bookshelf, library aesthetic"),
    ("types/08-starsky.jpg", 1280, 960,
     "child bedroom at night with fiber optic star sky stretch ceiling, hundreds of tiny stars on dark navy ceiling, "
     "magical bedtime atmosphere, soft bed lighting, dreamy mood"),

    ("portfolio/01a-living-matte.jpg", 1500, 1000,
     "wide overall shot of 30 sqm living room with seamless matte white stretch ceiling and recessed LED cove lighting around perimeter, neutral interior, sofa, coffee table, large windows"),
    ("portfolio/01b-living-matte.jpg", 1500, 1000,
     "close up architectural detail of LED cove lighting integrated into matte white stretch ceiling at the corner, precise installation"),

    ("portfolio/02a-bedroom-satin.jpg", 1500, 1000,
     "wide shot of bedroom with satin champagne stretch ceiling, double bed with quilted headboard, soft pendant lights"),
    ("portfolio/02b-bedroom-satin.jpg", 1500, 1000,
     "angled detail shot showing pearlescent sheen of satin stretch ceiling under warm bedroom lighting"),

    ("portfolio/03a-kitchen-glossy.jpg", 1500, 1000,
     "wide shot of compact 14 sqm kitchen with high gloss white stretch ceiling reflecting pendant lights, white handleless cabinets, marble backsplash"),
    ("portfolio/03b-kitchen-glossy.jpg", 1500, 1000,
     "looking up close shot of high gloss white stretch ceiling reflecting kitchen pendant lights and counter, mirror like surface"),

    ("portfolio/04a-kids-photoprint.jpg", 1500, 1000,
     "child bedroom with stretch ceiling featuring photo print of soft fluffy clouds and gentle blue sky, kids bed, toys, cheerful atmosphere"),
    ("portfolio/04b-kids-photoprint.jpg", 1500, 1000,
     "close up of cloud photo print stretch ceiling detail showing print quality and seamless surface"),

    ("portfolio/05a-hall-twolevel.jpg", 1500, 1000,
     "wide shot of entrance hall with two level stretch ceiling forming dropped border with hidden LED, elegant geometric ceiling design"),
    ("portfolio/05b-hall-twolevel.jpg", 1500, 1000,
     "looking up shot showing transition between two stretch ceiling levels with LED cove lighting"),

    ("portfolio/06a-bathroom.jpg", 1500, 1000,
     "modern bathroom with high gloss white moisture resistant stretch ceiling reflecting recessed spot lights, marble tile, freestanding tub, premium hotel style"),
    ("portfolio/06b-bathroom.jpg", 1500, 1000,
     "close up of recessed LED spot lights flush mounted into glossy white stretch ceiling, premium fittings"),

    ("portfolio/07a-dining-floating.jpg", 1500, 1000,
     "wide shot of dining area with floating stretch ceiling, continuous LED perimeter creates levitation effect, modern dining table, sculptural pendant"),
    ("portfolio/07b-dining-floating.jpg", 1500, 1000,
     "close up corner detail of floating stretch ceiling LED perimeter glow, architectural lighting effect"),

    ("portfolio/08a-office-fabric.jpg", 1500, 1000,
     "wide shot of home office with woven fabric stretch ceiling in warm beige, wooden desk, leather chair, bookcase, scholarly atmosphere"),
    ("portfolio/08b-office-fabric.jpg", 1500, 1000,
     "macro detail of woven fabric stretch ceiling texture in warm beige"),

    ("portfolio/09a-living-combo.jpg", 1500, 1000,
     "wide shot of large 35 sqm living room with combination two level stretch ceiling, matte white outer ring, glossy black inner rectangle with LED perimeter, dramatic architectural feature"),
    ("portfolio/09b-living-combo.jpg", 1500, 1000,
     "angled detail showing transition between matte white and glossy black stretch ceiling levels"),

    ("portfolio/10a-corridor.jpg", 1500, 1000,
     "long corridor with matte white stretch ceiling and row of recessed LED spotlights, gallery wall"),
    ("portfolio/10b-corridor.jpg", 1500, 1000,
     "close up of recessed spot lights flush mounted into matte white stretch ceiling in corridor"),

    ("portfolio/11a-kids-stars.jpg", 1500, 1000,
     "child bedroom at night with fiber optic star sky stretch ceiling, hundreds of pinpoint stars on dark navy, magical mood"),
    ("portfolio/11b-kids-stars.jpg", 1500, 1000,
     "close up of fiber optic stars embedded in dark navy stretch ceiling, twinkle effect"),

    ("portfolio/12a-openspace.jpg", 1500, 1000,
     "wide shot of 40 sqm open plan kitchen living with floating perimeter LED stretch ceiling and section with photo print of soft sky, modern penthouse"),
    ("portfolio/12b-openspace.jpg", 1500, 1000,
     "detail of transition between floating LED ceiling section and photo print sky section, architectural ceiling design"),

    ("team/01-measurer.jpg", 1280, 960,
     "professional measurer in clean uniform with laser distance meter measuring an empty apartment room, tape measure on floor, tablet for notes, daylight, professional documentary photography"),
    ("team/02-installation.jpg", 1280, 960,
     "installation team carefully stretching white pvc film stretch ceiling between aluminum profiles in apartment, heat gun warming material, two installers in branded uniform"),
    ("team/03-showroom.jpg", 1280, 960,
     "showroom interior with samples of stretch ceilings displayed on wall, matte glossy satin fabric photoprint variants, modern minimal showroom, sales consultant area"),
    ("team/04-equipment.jpg", 1280, 960,
     "close up macro shot of professional installation equipment, heat gun, aluminum profiles, rolled stretch ceiling material, tools laid out on workbench, industrial professional aesthetic"),
]


def gen(filename: str, width: int, height: int, prompt: str, idx: int) -> bool:
    out = IMG_DIR / filename
    if out.exists() and out.stat().st_size > 5000:
        print(f"[SKIP] {filename}")
        return True

    full_prompt = f"{prompt}. {STYLE}"
    encoded = urllib.parse.quote(full_prompt)
    url = (f"https://image.pollinations.ai/prompt/{encoded}"
           f"?width={width}&height={height}&seed={1000+idx}&nologo=true&model=flux&enhance=true")

    out.parent.mkdir(parents=True, exist_ok=True)
    print(f"[GEN ] {filename} ({width}x{height})...", flush=True)

    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=180) as resp:
                data = resp.read()
            if len(data) < 5000:
                raise Exception(f"Response too small: {len(data)} bytes")
            with open(out, "wb") as f:
                f.write(data)
            print(f"[OK  ] {filename} -> {len(data):,} bytes")
            return True
        except Exception as e:
            print(f"[RETRY {attempt+1}/3] {filename}: {e}")
            time.sleep(5 * (attempt + 1))

    print(f"[FAIL] {filename}")
    return False


def main():
    ok, fail = 0, 0
    for i, (fn, w, h, p) in enumerate(PROMPTS):
        if gen(fn, w, h, p, i):
            ok += 1
        else:
            fail += 1
    print(f"\n=== DONE: ok={ok}, fail={fail} of {len(PROMPTS)} ===")
    return 0 if fail < 5 else 1


if __name__ == "__main__":
    sys.exit(main())
