#!/usr/bin/env bash
set -Eeuo pipefail

readonly root="${DEPLOY_ROOT:-/var/www/personal-website}"
readonly sha="${1:?usage: deploy-release <40-character commit sha>}"

if [[ ! "$sha" =~ ^[0-9a-f]{40}$ ]]; then
  echo "Invalid commit SHA: $sha" >&2
  exit 2
fi

readonly archive="$root/incoming/$sha.tar.gz"
readonly release="$root/releases/$sha"
readonly staging="$root/releases/.staging-$sha"
readonly current="$root/current"
previous=""
if [[ -L "$current" ]]; then
  candidate="$(readlink -f "$current" 2>/dev/null || true)"
  if [[ "$candidate" == "$root/releases/"* && -d "$candidate" ]]; then
    previous="$candidate"
  fi
fi

cleanup() {
  rm -rf -- "$staging"
}
trap cleanup EXIT

if [[ ! -f "$archive" ]]; then
  echo "Release archive is missing: $archive" >&2
  exit 3
fi

if [[ ! -d "$release" ]]; then
  mkdir -p -- "$staging"
  tar --extract --gzip --file "$archive" --directory "$staging" --no-same-owner --no-same-permissions
  for required in index.html 404.html _astro pagefind; do
    if [[ ! -e "$staging/$required" ]]; then
      echo "Required release artifact is missing: $required" >&2
      exit 4
    fi
  done
  mv -- "$staging" "$release"
fi

rm -f -- "$root/current.next"
ln -s -- "$release" "$root/current.next"
mv -Tf -- "$root/current.next" "$current"

smoke_test() {
  local path
  for path in / /blog/ /projects/ /rss.xml; do
    curl --noproxy '*' --fail --silent --show-error --max-time 15 --insecure \
      --resolve www.execute42.top:443:127.0.0.1 "https://www.execute42.top$path" >/dev/null
  done
}

if ! smoke_test; then
  echo "Smoke test failed for $sha" >&2
  if [[ -n "$previous" && -d "$previous" ]]; then
    rm -f -- "$root/current.previous"
    ln -s -- "$previous" "$root/current.previous"
    mv -Tf -- "$root/current.previous" "$current"
    echo "Restored previous release: $(basename "$previous")" >&2
  else
    rm -f -- "$current"
  fi
  exit 5
fi

rm -f -- "$archive"
printf '%s deploy %s\n' "$(date --iso-8601=seconds)" "$sha" >> "$root/deployments.log"

mapfile -t stale < <(
  find "$root/releases" -mindepth 1 -maxdepth 1 -type d -name '[0-9a-f]*' -printf '%T@ %p\n' |
    sort -rn | tail -n +6 | cut -d' ' -f2-
)
for path in "${stale[@]}"; do
  [[ "$path" == "$root/releases/"* ]] || continue
  [[ "$path" != "$(readlink -f "$current")" ]] || continue
  rm -rf -- "$path"
done

echo "Deployed $sha"
