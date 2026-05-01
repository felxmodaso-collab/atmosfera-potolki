#!/usr/bin/env python3
"""Batch image generation for АТМОСФЕРА (натяжные потолки).
Runs generate_design.py for each of 37 prompts. Skips already-generated.
"""
import os
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
IMG_DIR = ROOT / "public" / "images"
GEN = Path(r"C:\Users\Anton\Desktop\project\utils\generate_design.py")

STYLE = (
    "interior photography, magazine-quality, natural soft daylight, premium real estate, "
    "modern Russian/European apartment, minimalist scandinavian style, "
    "professional architectural photography, no people, sharp focus, clean composition, "
    "warm neutral palette (whites, beiges, soft greys with single accent color), "
    "shot on full-frame camera, 35mm lens, depth of field"
)

# (filename, aspect, prompt_addition)
PROMPTS = [
    # HERO (1)
    ("hero/main.jpg", "16:9",
     "wide shot of a bright contemporary living room with a perfectly flat matte white "
     "stretch ceiling with hidden LED cove lighting, large floor-to-ceiling windows, "
     "linen curtains, light oak parquet, sculptural sofa in cream boucle, "
     "single tall vase with eucalyptus branches, hero composition with clean negative space at top, "
     "ceiling is the visual focus showing seamless flat surface and elegant lighting"),

    # TYPES (8)
    ("types/01-matte.jpg", "4:3",
     "cozy bedroom with matte white stretch ceiling, queen bed with linen bedding, "
     "two bedside lamps with warm soft glow, ceiling crisp matte white surface clearly visible, "
     "calm muted tones"),
    ("types/02-glossy.jpg", "4:3",
     "modern living room with high-gloss black stretch ceiling reflecting warm pendant lights and room below, "
     "deep dark glossy surface with mirror-like reflections, dramatic premium aesthetic, "
     "leather armchair, brass fixtures"),
    ("types/03-satin.jpg", "4:3",
     "elegant dining room with satin champagne beige stretch ceiling, soft pearlescent finish, "
     "large modern chandelier hanging in center, oval wood table with six chairs, "
     "warm golden hour light"),
    ("types/04-photoprint.jpg", "4:3",
     "child bedroom with stretch ceiling featuring large-scale photo-print of soft cumulus clouds against blue sky, "
     "single bed with plush toys, kid-friendly cozy atmosphere, "
     "ceiling print is the focal point and highly detailed"),
    ("types/05-twolevel.jpg", "4:3",
     "modern living room with two-level stretch ceiling, lower outer ring matte white, "
     "raised inner rectangle with hidden LED perimeter lighting, geometric architectural feature, "
     "minimalist sofa, contemporary art on wall"),
    ("types/06-floating.jpg", "4:3",
     "modern kitchen with floating stretch ceiling: continuous LED light strip around the entire perimeter "
     "creates illusion ceiling is hovering, sleek handleless cabinets, marble island, "
     "premium architectural lighting"),
    ("types/07-fabric.jpg", "4:3",
     "home office with woven fabric stretch ceiling in warm beige tone, subtle texture visible, "
     "wooden desk, leather chair, bookshelf with curated objects, library aesthetic"),
    ("types/08-starsky.jpg", "4:3",
     "child bedroom at night with fiber-optic star sky stretch ceiling, hundreds of tiny pinpoint stars on dark navy ceiling, "
     "magical bedtime atmosphere, soft bed lighting, dreamy mood"),

    # PORTFOLIO (12 объектов × 2 ракурса = 24)
    ("portfolio/01a-living-matte.jpg", "3:2",
     "wide overall shot of 30 sqm living room with seamless matte white stretch ceiling and recessed LED cove lighting around perimeter, "
     "neutral interior, sofa, coffee table, large windows"),
    ("portfolio/01b-living-matte.jpg", "3:2",
     "close-up architectural detail of LED cove lighting integrated into matte white stretch ceiling, "
     "the corner where ceiling meets wall showing precise installation"),

    ("portfolio/02a-bedroom-satin.jpg", "3:2",
     "wide shot of bedroom with satin champagne stretch ceiling, double bed with quilted headboard, soft pendant lights"),
    ("portfolio/02b-bedroom-satin.jpg", "3:2",
     "angled detail shot showing pearlescent sheen of satin stretch ceiling under warm bedroom lighting"),

    ("portfolio/03a-kitchen-glossy.jpg", "3:2",
     "wide shot of compact 14 sqm kitchen with high-gloss white stretch ceiling reflecting pendant lights, "
     "white handleless cabinets, marble backsplash"),
    ("portfolio/03b-kitchen-glossy.jpg", "3:2",
     "looking up close-up of high-gloss white stretch ceiling reflecting kitchen pendant lights and counter, "
     "mirror-like surface, premium aesthetic"),

    ("portfolio/04a-kids-photoprint.jpg", "3:2",
     "child bedroom with stretch ceiling featuring photo-print of soft fluffy clouds and gentle blue sky, "
     "kids bed, toys, bright cheerful atmosphere"),
    ("portfolio/04b-kids-photoprint.jpg", "3:2",
     "close-up of cloud photo-print stretch ceiling detail showing print quality and seamless surface"),

    ("portfolio/05a-hall-twolevel.jpg", "3:2",
     "wide shot of entrance hall with two-level stretch ceiling forming dropped border with hidden LED, "
     "elegant geometric ceiling design"),
    ("portfolio/05b-hall-twolevel.jpg", "3:2",
     "looking up shot showing transition between two stretch ceiling levels with LED cove lighting"),

    ("portfolio/06a-bathroom.jpg", "3:2",
     "modern bathroom with high-gloss white moisture-resistant stretch ceiling reflecting recessed spot lights, "
     "marble tile, freestanding tub, premium hotel-style"),
    ("portfolio/06b-bathroom.jpg", "3:2",
     "close-up of recessed LED spot lights flush-mounted into glossy white stretch ceiling, premium fittings"),

    ("portfolio/07a-dining-floating.jpg", "3:2",
     "wide shot of dining area with floating stretch ceiling: continuous LED perimeter creates levitation effect, "
     "modern dining table, sculptural pendant"),
    ("portfolio/07b-dining-floating.jpg", "3:2",
     "close-up corner detail of floating stretch ceiling LED perimeter glow, architectural lighting effect"),

    ("portfolio/08a-office-fabric.jpg", "3:2",
     "wide shot of home office with woven fabric stretch ceiling in warm beige, "
     "wooden desk, leather chair, bookcase, scholarly atmosphere"),
    ("portfolio/08b-office-fabric.jpg", "3:2",
     "macro detail of woven fabric stretch ceiling texture in warm beige"),

    ("portfolio/09a-living-combo.jpg", "3:2",
     "wide shot of large 35 sqm living room with combination two-level stretch ceiling: "
     "matte white outer ring, glossy black inner rectangle with LED perimeter, dramatic architectural feature"),
    ("portfolio/09b-living-combo.jpg", "3:2",
     "angled detail showing transition between matte white and glossy black stretch ceiling levels"),

    ("portfolio/10a-corridor.jpg", "3:2",
     "long corridor with matte white stretch ceiling and row of recessed LED spotlights, gallery wall"),
    ("portfolio/10b-corridor.jpg", "3:2",
     "close-up of recessed spot lights flush-mounted into matte white stretch ceiling in corridor"),

    ("portfolio/11a-kids-stars.jpg", "3:2",
     "child bedroom at night with fiber-optic star sky stretch ceiling, hundreds of pinpoint stars on dark navy, "
     "magical mood, kid asleep concept"),
    ("portfolio/11b-kids-stars.jpg", "3:2",
     "close-up of fiber-optic stars embedded in dark navy stretch ceiling, twinkle effect"),

    ("portfolio/12a-openspace.jpg", "3:2",
     "wide shot of 40 sqm open-plan kitchen-living with floating perimeter LED stretch ceiling and section "
     "with photo-print of soft sky, ambitious project, modern penthouse"),
    ("portfolio/12b-openspace.jpg", "3:2",
     "detail of transition between floating LED ceiling section and photo-print sky section, architectural ceiling design"),

    # TEAM / PROCESS (4)
    ("team/01-measurer.jpg", "4:3",
     "professional measurer in clean uniform with laser distance meter measuring an empty apartment room, "
     "tape measure on floor, tablet for notes, daylight, professional documentary photography"),
    ("team/02-installation.jpg", "4:3",
     "installation team carefully stretching white pvc film stretch ceiling between aluminum profiles in apartment, "
     "heat gun warming material, two installers in branded uniform, professional work in progress"),
    ("team/03-showroom.jpg", "4:3",
     "showroom interior with samples of stretch ceilings displayed on wall: matte, glossy, satin, fabric, photoprint variants, "
     "modern minimal showroom, sales consultant area, customer-facing space"),
    ("team/04-equipment.jpg", "4:3",
     "close-up macro shot of professional installation equipment: heat gun, aluminum profiles, "
     "rolled stretch ceiling material, tools laid out on workbench, industrial professional aesthetic"),
]


def main():
    skipped, generated, failed = 0, 0, 0
    for filename, aspect, prompt_text in PROMPTS:
        out = IMG_DIR / filename
        if out.exists() and out.stat().st_size > 1000:
            print(f"[SKIP] {filename} already exists ({out.stat().st_size} bytes)")
            skipped += 1
            continue
        full_prompt = f"{prompt_text}. {STYLE}"
        out.parent.mkdir(parents=True, exist_ok=True)
        print(f"\n[GEN ] {filename} ({aspect})...", flush=True)
        try:
            result = subprocess.run(
                ["python", str(GEN),
                 "--prompt", full_prompt,
                 "--output", str(out),
                 "--model", "standard",
                 "--size", "2K",
                 "--aspect", aspect],
                capture_output=True, text=True, timeout=300
            )
            if result.returncode == 0 and out.exists() and out.stat().st_size > 1000:
                print(f"[OK  ] {filename} -> {out.stat().st_size} bytes")
                generated += 1
            else:
                print(f"[FAIL] {filename}: rc={result.returncode}")
                print(f"       stderr: {result.stderr[-400:]}")
                failed += 1
        except subprocess.TimeoutExpired:
            print(f"[FAIL] {filename}: timeout")
            failed += 1
        except Exception as e:
            print(f"[FAIL] {filename}: {e}")
            failed += 1

    print(f"\n=== DONE: generated={generated}, skipped={skipped}, failed={failed} ===")
    return 0 if failed == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
