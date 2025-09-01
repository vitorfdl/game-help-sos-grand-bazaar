import { atom } from "jotai";

// Controls whether the mobile footer on Residents is expanded
export const footerExpandedAtom = atom(false);

// GitHub repository latest update metadata
export type RepoUpdateInfo = {
  isoTimestamp: string | null;
  relativeLabel: string | null;
  loading: boolean;
  error: string | null;
};

export const repoUpdateAtom = atom<RepoUpdateInfo>({
  isoTimestamp: null,
  relativeLabel: null,
  loading: false,
  error: null,
});
