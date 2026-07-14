#!/usr/bin/env bash
set -Eeuo pipefail

readonly root="${DEPLOY_ROOT:-/var/www/personal-website}"
target="${1:-previous}"
readonly current="$root/current"
old=""
if [[ -L "$current" ]]; then
  candidate="$(readlink -f "$current" 2>/dev/null || true)"
  if [[ "$candidate" == "$root/releases/"* && -d "$candidate" ]]; then
    old="$candidate"
  fi
fi

if [[ "$target" == previous ]]; then
  target="$(
    find "$root/releases" -mindepth 1 -maxdepth 1 -type d -name '[0-9a-f]*' -printf '%T@ %f\n' |
      sort -rn | awk -v active="$(basename "$old")" '$2 != active { print $2; exit }'
  )"
fi

if [[ ! "$target" =~ ^[0-9a-f]{40}$ || ! -d "$root/releases/$target" ]]; then
  echo "Release is unavailable: ${target:-previous}" >&2
  exit 2
fi

for required in index.html 404.html _astro pagefind; do
  [[ -e "$root/releases/$target/$required" ]] || {
    echo "Release $target is incomplete: $required is missing" >&2
    exit 3
  }
done

rm -f -- "$root/current.next"
ln -s -- "$root/releases/$target" "$root/current.next"
mv -Tf -- "$root/current.next" "$current"

if ! curl --noproxy '*' --fail --silent --show-error --max-time 15 --insecure \
  --resolve www.execute42.top:443:127.0.0.1 https://www.execute42.top/ >/dev/null; then
  if [[ -n "$old" && -d "$old" ]]; then
    rm -f -- "$root/current.failed"
    ln -s -- "$old" "$root/current.failed"
    mv -Tf -- "$root/current.failed" "$current"
  fi
  echo "Rollback smoke test failed; the original release was restored" >&2
  exit 4
fi

printf '%s rollback %s\n' "$(date --iso-8601=seconds)" "$target" >> "$root/deployments.log"
echo "Rolled back to $target"
