#!/usr/bin/env bash
# Generates the 1200x630 Open Graph images in public/og/.
#
# Requires ffmpeg (with libfreetype) and curl. Poppins is downloaded from the
# Google Fonts repository on first run and cached in .cache/fonts/.
#
# Usage: npm run og
#
# The homepage image (the one shown when quantumx.ventures is shared) is a
# screenshot of the hero, design/source/og-home-hero-screenshot.png, fitted to
# 1200x630 on the page background. Replace that file to change it.
#
# Edit the PAGES list to change the other pages' titles. Each title is up to three lines,
# separated by "|", because ffmpeg's drawtext does not wrap text.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FONTS="$ROOT/.cache/fonts"
OUT="$ROOT/public/og"
IMAGE="$ROOT/public/images/dilution-refrigerator.webp"

mkdir -p "$FONTS" "$OUT"

for weight in Light Regular; do
  if [ ! -f "$FONTS/Poppins-$weight.ttf" ]; then
    curl -sfL -o "$FONTS/Poppins-$weight.ttf" \
      "https://github.com/google/fonts/raw/main/ofl/poppins/Poppins-$weight.ttf"
  fi
done

LIGHT="$FONTS/Poppins-Light.ttf"
REGULAR="$FONTS/Poppins-Regular.ttf"

# Homepage: fit the hero screenshot to 1200x630 without cropping.
ffmpeg -loglevel error -y -i "$ROOT/design/source/og-home-hero-screenshot.png" \
  -vf "scale=-1:630:flags=lanczos,pad=1200:630:(ow-iw)/2:0:color=0x0A0A09" \
  -q:v 2 "$OUT/home.jpg"
echo "public/og/home.jpg"

# slug;eyebrow;title lines
PAGES=(
  "studio;STUDIO;A studio,|not a fund."
  "ventures;VENTURES;Companies built|in the studio."
  "thesis;THESIS;Where we|are looking."
  "insights;INSIGHTS;Notes on the|quantum economy."
  "about;ABOUT;A venture studio for|quantum technology."
  "contact;START A CONVERSATION;Tell us what|you are building."
)

for entry in "${PAGES[@]}"; do
  IFS=';' read -r slug eyebrow title <<<"$entry"
  IFS='|' read -r -a lines <<<"$title"

  # Vertically centre the title block on the left half.
  count=${#lines[@]}
  start=$((330 - (count * 78) / 2 + 40))

  filter="[1:v]scale=-1:760,format=rgba[img];[0:v][img]overlay=x=660:y=-70[bg];"
  filter+="[bg]drawtext=fontfile=$REGULAR:text='QuantumX Ventures':fontsize=26:fontcolor=0xECEAE4:x=72:y=72,"
  filter+="drawtext=fontfile=$REGULAR:text='$eyebrow':fontsize=15:fontcolor=0xA09E96:x=72:y=118"
  for i in "${!lines[@]}"; do
    y=$((start + i * 78))
    filter+=",drawtext=fontfile=$LIGHT:text='${lines[$i]}':fontsize=66:fontcolor=0xECEAE4:x=68:y=$y"
  done

  ffmpeg -loglevel error -y \
    -f lavfi -i "color=c=0x0A0A09:s=1200x630" \
    -i "$IMAGE" \
    -filter_complex "$filter" \
    -frames:v 1 -q:v 3 "$OUT/$slug.jpg"

  echo "public/og/$slug.jpg"
done
