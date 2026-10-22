#!/usr/bin/env bash
BASE="${1:-http://localhost:3000}"
FAILED=0
TMP="$(mktemp -d)"

pass() { echo "PASS  $1"; }
fail() { echo "FAIL  $1"; FAILED=1; }
expect() { if [ "$2" = "$3" ]; then pass "$1"; else fail "$1 (got $2)"; fi }

if curl -fs "$BASE" > "$TMP/home.html"; then
  pass "Home page loads"
else
  fail "Home page loads. Run npm run start in another terminal first."
  rm -rf "$TMP"
  exit 1
fi

KEY="check-$RANDOM-$RANDOM"
BODY='{"phone":"0911234567","items":[{"id":1,"qty":1}]}'
curl -s -X POST "$BASE/api/orders" -H "Content-Type: application/json" -H "Idempotency-Key: $KEY" -d "$BODY" > "$TMP/a.json" &
curl -s -X POST "$BASE/api/orders" -H "Content-Type: application/json" -H "Idempotency-Key: $KEY" -d "$BODY" > "$TMP/b.json" &
wait
if [ -s "$TMP/a.json" ] && cmp -s "$TMP/a.json" "$TMP/b.json"; then
  pass "A double tap places one order"
else
  fail "A double tap places one order"
fi

CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/api/orders" -H "Content-Type: application/json" -H "Idempotency-Key: p-$RANDOM" -d '{"phone":"12","items":[{"id":1,"qty":1}]}')
expect "A bad phone number is refused" "$CODE" "400"

CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/api/orders" -H "Content-Type: application/json" -H "Idempotency-Key: d-$RANDOM" -d '{"phone":"0911234567","items":[{"id":999,"qty":1}]}')
expect "An unknown dish is refused" "$CODE" "400"

CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/api/orders" -H "Content-Type: application/json" -d "$BODY")
expect "An order with no key is refused" "$CODE" "400"

if grep -q 'og:image' "$TMP/home.html"; then pass "Share card has an image"; else fail "Share card has an image"; fi

if curl -fs "$BASE/sitemap.xml" | grep -q "<loc>"; then pass "Sitemap lists routes"; else fail "Sitemap lists routes"; fi
if curl -fs "$BASE/robots.txt" | grep -q "Disallow: /api/"; then pass "Robots file blocks /api/"; else fail "Robots file blocks /api/"; fi

SECRET=""
if [ -f .env.local ]; then SECRET="$(grep '^SESSION_SECRET=' .env.local | cut -d= -f2-)"; fi
if [ -d .next/static ]; then
  if grep -rq "SESSION_SECRET" .next/static || { [ -n "$SECRET" ] && grep -rqF "$SECRET" .next/static; }; then
    fail "No secret in browser files"
  else
    pass "No secret in browser files"
  fi
else
  fail "No .next/static folder. Run npm run build first."
fi

if grep -rn ":hover" app > /dev/null; then fail "Nothing hides behind hover"; else pass "Nothing hides behind hover"; fi
if grep -rnE "<div[^>]*onClick" app components > /dev/null; then fail "No clickable divs"; else pass "No clickable divs"; fi
if grep -q "min-height: 44px" app/globals.css; then pass "Touch targets set to 44 pixels"; else fail "Touch targets set to 44 pixels"; fi

rm -rf "$TMP"
exit $FAILED
