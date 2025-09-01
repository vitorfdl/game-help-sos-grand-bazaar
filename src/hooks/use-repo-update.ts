import { useEffect } from "react";
import { useAtom } from "jotai";
import { repoUpdateAtom, type RepoUpdateInfo } from "@/store/atoms";

const REPO_API_URL =
  "https://api.github.com/repos/vitorfdl/game-help-sos-grand-bazaar";
const CACHE_KEY = "repo_update_info_v1";
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

function formatRelativeTime(fromISO: string): string {
  const from = new Date(fromISO).getTime();
  const now = Date.now();
  const diffMs = from - now;
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });

  const divisions: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 1000 * 60 * 60 * 24 * 365],
    ["month", 1000 * 60 * 60 * 24 * 30],
    ["week", 1000 * 60 * 60 * 24 * 7],
    ["day", 1000 * 60 * 60 * 24],
    ["hour", 1000 * 60 * 60],
    ["minute", 1000 * 60],
    ["second", 1000],
  ];

  for (const [unit, ms] of divisions) {
    const delta = Math.round(diffMs / ms);
    if (Math.abs(delta) >= 1 || unit === "second") {
      return rtf.format(delta, unit);
    }
  }
  return "just now";
}

function readCache(): RepoUpdateInfo | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { ts: number; data: RepoUpdateInfo };
    if (Date.now() - parsed.ts > CACHE_TTL_MS) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function writeCache(data: RepoUpdateInfo) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
  } catch {
    // ignore
  }
}

export function useRepoUpdate() {
  const [state, setState] = useAtom(repoUpdateAtom);

  useEffect(() => {
    const cached = readCache();
    if (cached) {
      setState(cached);
      return;
    }

    let cancelled = false;
    setState((s) => ({ ...s, loading: true, error: null }));

    fetch(REPO_API_URL, { headers: { Accept: "application/vnd.github+json" } })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const pushedAt: string | undefined = data?.pushed_at ||
          data?.updated_at;
        if (!pushedAt) throw new Error("Missing pushed_at");
        const relative = formatRelativeTime(pushedAt);
        const next: RepoUpdateInfo = {
          isoTimestamp: pushedAt,
          relativeLabel: relative,
          loading: false,
          error: null,
        };
        if (!cancelled) {
          setState(next);
          writeCache(next);
        }
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : "Unknown error";
        const next: RepoUpdateInfo = {
          isoTimestamp: null,
          relativeLabel: null,
          loading: false,
          error: message,
        };
        if (!cancelled) {
          setState(next);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [setState]);

  return state;
}
