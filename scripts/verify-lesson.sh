#!/usr/bin/env bash
# Usage: ./scripts/verify-lesson.sh <file> <vocab|grammar>
FILE="$1"
TYPE="${2:-vocab}"

echo "Verifying: $FILE"

if [ ! -f "$FILE" ]; then
  echo "❌ File not found: $FILE"
  exit 1
fi
echo "✅ File exists"

MERMAID_COUNT=$(grep -c '```mermaid' "$FILE")
if [ "$TYPE" = "vocab" ]; then
  EXPECTED=2
else
  EXPECTED=1
fi

if [ "$MERMAID_COUNT" -ge "$EXPECTED" ]; then
  echo "✅ Mermaid diagrams: $MERMAID_COUNT (expected >= $EXPECTED)"
else
  echo "❌ Mermaid diagrams: $MERMAID_COUNT (expected >= $EXPECTED)"
  exit 1
fi

if [ "$TYPE" = "vocab" ]; then
  SECTIONS=("Vocabulary Tree" "Grammar Map" "Examples" "Common Mistakes" "Practice")
else
  SECTIONS=("Grammar Map" "Examples" "Common Mistakes" "Practice")
fi

FAIL=0
for section in "${SECTIONS[@]}"; do
  if grep -q "$section" "$FILE"; then
    echo "✅ Section: $section"
  else
    echo "❌ Missing section: $section"
    FAIL=$((FAIL+1))
  fi
done

if grep -q "Português" "$FILE" && grep -q "English" "$FILE" && grep -q "Français" "$FILE"; then
  echo "✅ PT/EN/FR columns present"
else
  echo "❌ Missing PT/EN/FR columns"
  FAIL=$((FAIL+1))
fi

echo ""
[ $FAIL -eq 0 ] && echo "✅ ALL CHECKS PASSED" && exit 0 || (echo "❌ $FAIL CHECK(S) FAILED" && exit 1)
