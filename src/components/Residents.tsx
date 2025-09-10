import { useAtom } from "jotai";
import {
	Cake,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ChevronUp,
	Crown,
	Flower2,
	Gem,
	Leaf,
	Search,
	Snowflake,
	Sun,
	Users,
	X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Season } from "@/data/types";
import { useIsMobile } from "@/hooks/use-mobile";
import { withBase } from "@/lib/utils";
import { footerExpandedAtom } from "@/store/atoms";
import {
	residents as allResidents,
	avatarFileOverrides,
	type Resident,
	type ResidentGroup,
} from "../data/residents";
import ItemDisplay from "./ItemDisplay";
import { Input } from "./ui/input";

function toAvatarFilename(name: string): string {
	const override =
		avatarFileOverrides[name as keyof typeof avatarFileOverrides];
	const base = override ?? name.toLowerCase();
	return withBase(`/avatars/${base}.webp`);
}

const groups: Array<"All" | ResidentGroup> = [
	"All",
	"Bachelors",
	"Bachelorettes",
	"Villagers",
];

const seasonIcon: Record<Season, typeof Flower2> = {
	Spring: Flower2,
	Summer: Sun,
	Autumn: Leaf,
	Winter: Snowflake,
};

const seasonColors: Record<Season, string> = {
	Spring: "text-rose-400 border-rose-200/50 bg-rose-50/50 dark:bg-rose-950/30",
	Summer:
		"text-green-500 border-green-200/50 bg-green-50/50 dark:bg-green-950/30",
	Autumn:
		"text-amber-500 border-amber-200/50 bg-amber-50/50 dark:bg-amber-950/30",
	Winter: "text-sky-500 border-sky-200/50 bg-sky-50/50 dark:bg-sky-950/30",
};

function BirthdayBadge({
	resident,
	variant = "default",
}: {
	resident: Resident;
	variant?: "default" | "floating";
}) {
	if (!resident.birthday) return null;

	const { season, day } = resident.birthday;
	const SeasonIcon = seasonIcon[season];

	if (variant === "floating") {
		return (
			<div
				className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex items-center justify-center px-2 py-1 rounded-full border-2 border-background shadow-lg backdrop-blur-sm ${
					season === "Spring"
						? "bg-rose-500 text-white"
						: season === "Summer"
							? "bg-green-500 text-white"
							: season === "Autumn"
								? "bg-amber-500 text-white"
								: "bg-sky-500 text-white"
				}`}
			>
				<div className="flex items-center gap-1 whitespace-nowrap">
					<Cake className="h-3 w-3" />
					<SeasonIcon className="h-3 w-3" />
					<span className="text-[10px] font-bold leading-none">
						{season.slice(0, 3)} {day}
					</span>
				</div>
			</div>
		);
	}

	return (
		<div
			className={`inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border ${seasonColors[season]} bg-background/60`}
		>
			<Cake className="h-4 w-4" />
			<div className="flex items-center gap-1.5">
				<SeasonIcon className="h-4 w-4" />
				<span className="text-sm font-medium">
					{season} {day}
				</span>
			</div>
		</div>
	);
}

function TagList({
	label,
	items,
	variant,
	favorite,
}: {
	label: string;
	items: string[];
	variant: "favorite" | "love" | "like" | "dislike";
	favorite?: string;
}) {
	// If we have a favorite, always put it first, then add other items (excluding favorite if it was already in the list)
	const ordered = favorite
		? [favorite, ...items.filter((i) => i !== favorite)]
		: items;

	return (
		<div className="flex flex-col gap-1">
			<span className="font-medium">{label}:</span>
			<div className="flex flex-wrap gap-2">
				{ordered.map((text) => (
					<ItemDisplay
						key={text}
						itemName={text}
						variant={text === favorite ? "favorite" : variant}
						chipLabel={text === favorite ? "Favorite" : undefined}
					/>
				))}
			</div>
		</div>
	);
}

function FavoriteColorBadge({ color }: { color?: string }) {
	if (!color) return null;
	const lower = color.toLowerCase();
	const dotClass =
		lower === "red"
			? "bg-red-500"
			: lower === "blue"
				? "bg-sky-500"
				: lower === "yellow"
					? "bg-amber-500"
					: "bg-muted-foreground";
	return (
		<span className={`inline-flex items-center gap-2 px-2 py-1 rounded-xs border text-xs text-muted-foreground`}>
			<span className={`h-2 w-2 rounded-full ${dotClass}`} />
			<span className="font-medium">Color:</span>
			<span className="font-semibold text-foreground/90">{color}</span>
		</span>
	);
}

function DislikesBadge({ dislikes }: { dislikes?: string }) {
	if (!dislikes) return null;
	return (
		<span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-xs border text-xs text-muted-foreground">
			<X className="h-3.5 w-3.5" />
			<span className="font-semibold text-foreground/80">{dislikes}</span>
		</span>
	);
}

function GroupBadge({ group }: { group?: string }) {
	if (!group) return null;  
	return (
		<span className="inline-flex items-center gap-1 px-2 py-1 rounded-xs border text-xs text-foreground/80 border-border">
			<span className="font-semibold">{group}</span>
		</span>
	);
}

export default function Residents() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [query, setQuery] = useState("");
	const [group, setGroup] = useState<"All" | ResidentGroup>("All");
	const initialFromParam = (() => {
		const param = searchParams.get("resident") ?? "";
		return allResidents.some((r) => r.name === param)
			? param
			: (allResidents[0]?.name ?? "");
	})();
	const [selectedName, setSelectedName] = useState<string>(initialFromParam);
	const thumbnailsRef = useRef<HTMLDivElement>(null);
	const isMobile = useIsMobile();
	const [footerExpanded, setFooterExpanded] = useAtom(footerExpandedAtom);

	const filtered: Resident[] = useMemo(() => {
		const q = query.trim().toLowerCase();
		return allResidents.filter((r) => {
			if (group !== "All" && r.group !== group) return false;
			if (!q) return true;
			const haystack = [
				r.name,
				r.favorite ?? "",
				...r.loves,
				...r.likes,
				r.dislikes ?? "",
				r.favorite_color ?? "",
				r.group,
			]
				.join(" ")
				.toLowerCase();
			return haystack.includes(q);
		});
	}, [query, group]);

	const currentIndex = useMemo(() => {
		const idx = filtered.findIndex((r) => r.name === selectedName);
		return idx >= 0 ? idx : 0;
	}, [filtered, selectedName]);

	const current = filtered[currentIndex] ?? filtered[0];

	// Keep selection in sync when URL query param changes externally
	useEffect(() => {
		const param = searchParams.get("resident") ?? "";
		if (
			param &&
			param !== selectedName &&
			allResidents.some((r) => r.name === param)
		) {
			setSelectedName(param);
		}
	}, [searchParams]);

	function selectByName(name: string, opts?: { replace?: boolean }) {
		setSelectedName(name);
		const next = new URLSearchParams(searchParams);
		if (name) next.set("resident", name);
		else next.delete("resident");
		setSearchParams(next, { replace: opts?.replace ?? true });
	}

	useEffect(() => {
		if (!current) return;
		selectByName(current.name);
	}, [query, group]);

	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (e.key === "ArrowLeft") {
				e.preventDefault();
				goPrev();
			} else if (e.key === "ArrowRight") {
				e.preventDefault();
				goNext();
			}
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	});

	function goPrev() {
		if (filtered.length === 0) return;
		const nextIndex = (currentIndex - 1 + filtered.length) % filtered.length;
		selectByName(filtered[nextIndex].name);
		scrollIntoView(nextIndex);
	}

	function goNext() {
		if (filtered.length === 0) return;
		const nextIndex = (currentIndex + 1) % filtered.length;
		selectByName(filtered[nextIndex].name);
		scrollIntoView(nextIndex);
	}

	function scrollIntoView(idx: number) {
		const container = thumbnailsRef.current;
		if (!container) return;
		const node = container.querySelector(
			`[data-index="${idx}"]`,
		) as HTMLElement | null;
		if (node) {
			node.scrollIntoView({
				behavior: "smooth",
				inline: "center",
				block: "nearest",
			});
		}
	}

	return (
		<div className="flex flex-col relative min-h-0">
			<main className={`flex-1 ${isMobile && !footerExpanded ? "pb-12" : ""}`}>
				<div className={`mx-auto max-w-4xl py-2`}>
					{current ? (
						<div className="flex items-center gap-4">
							{/* Previous Button - Desktop Only */}
							<button
								className="hidden md:flex h-11 w-11 items-center justify-center rounded-full border bg-background/80 hover:bg-accent transition shrink-0"
								aria-label="Previous"
								onClick={goPrev}
							>
								<ChevronLeft className="h-5 w-5" />
							</button>

							{/* Main Card */}
							<div
								className={`flex-1 grid grid-cols-1 md:grid-cols-[1fr,2fr] gap-6 md:gap-8 items-center rounded-2xl ${isMobile ? "p-4" : "p-6 md:p-8"} bg-card/70 backdrop-blur border shadow-xl overflow-hidden`}
							>
								<div className="flex justify-center">
									<div className="relative p-[6px] rounded-2xl bg-gradient-to-br from-[var(--chart-2)] via-[var(--chart-1)] to-[var(--chart-3)]">
										<img
											src={toAvatarFilename(current.name)}
											onError={(e) => {
												(e.currentTarget as HTMLImageElement).src =
													withBase("/vite.svg");
											}}
											alt={current.name}
											className={`${isMobile ? "h-36 w-36" : "h-44 w-44"} md:h-64 md:w-64 rounded-xl object-cover border-2 border-background shadow-lg`}
										/>
										{isMobile && (
											<BirthdayBadge resident={current} variant="floating" />
										)}
									</div>
								</div>
								<div className="space-y-4 min-w-0">
									<div className="flex items-center justify-between gap-3">
										<h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
											{current.name}
										</h2>
										<div className="flex md:hidden gap-2 shrink-0">
											<button
												className="h-10 w-10 flex items-center justify-center rounded-full border bg-background/80 hover:bg-accent"
												aria-label="Previous"
												onClick={goPrev}
											>
												<ChevronLeft className="h-5 w-5" />
											</button>
											<button
												className="h-10 w-10 flex items-center justify-center rounded-full border bg-background/80 hover:bg-accent"
												aria-label="Next"
												onClick={goNext}
											>
												<ChevronRight className="h-5 w-5" />
											</button>
										</div>
										<div className="hidden md:flex">
											<BirthdayBadge resident={current} />
										</div>
									</div>
								<div className="flex items-center gap-2 text-sm text-muted-foreground">
									<GroupBadge group={current.group} />
									<FavoriteColorBadge color={current.favorite_color} />
									<DislikesBadge dislikes={current.dislikes} />
								</div>
									<div className="space-y-3">
										<TagList label="Loves" items={current.loves} variant="love" favorite={current.favorite} />
										<TagList label="Likes" items={current.likes} variant="like" />
									</div>
								</div>
							</div>

							{/* Next Button - Desktop Only */}
							<button
								className="hidden md:flex h-11 w-11 items-center justify-center rounded-full border bg-background/80 hover:bg-accent transition shrink-0"
								aria-label="Next"
								onClick={goNext}
							>
								<ChevronRight className="h-5 w-5" />
							</button>
						</div>
					) : (
						<div className="text-center text-muted-foreground">
							No residents match your search.
						</div>
					)}
				</div>
			</main>

			<footer
				className={`${isMobile ? "fixed left-0 right-0 bottom-0 z-40" : "sticky bottom-0 z-10"} bg-background/90 backdrop-blur border-t`}
			>
				{/* Mobile Expandable Header */}
				{isMobile && (
					<div className="flex items-center justify-between px-4 py-2 border-b">
						<div className="text-sm font-medium text-muted-foreground">
							{filtered.length} resident{filtered.length !== 1 ? "s" : ""}{" "}
							{group !== "All" && `(${group})`}
						</div>
						<button
							onClick={() => setFooterExpanded(!footerExpanded)}
							className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-accent transition-colors"
						>
							<span className="text-sm">
								{footerExpanded ? "Collapse" : "Expand"}
							</span>
							{footerExpanded ? (
								<ChevronDown className="h-4 w-4" />
							) : (
								<ChevronUp className="h-4 w-4" />
							)}
						</button>
					</div>
				)}

				{/* Footer Content */}
				<div
					className={`mx-auto px-4 transition-all duration-300 ${
						isMobile
							? footerExpanded
								? "py-3 max-h-[70vh] opacity-100"
								: "py-0 max-h-0 opacity-0 overflow-hidden"
							: "py-3 sm:py-4"
					}`}
				>
					<div className="space-y-3">
						<div className="flex flex-col md:flex-row gap-3 md:items-center">
							<div className="inline-flex rounded-full border bg-secondary p-0.5 sm:p-1 md:p-1.5">
								{groups.map((g) => (
									<button
										key={g}
										className={`px-3 py-1 sm:py-1.5 rounded-full text-xs transition flex items-center gap-2 ${
											g === group
												? "bg-background shadow-sm"
												: "hover:bg-accent/60"
										}`}
										onClick={() => setGroup(g)}
									>
										{g === "All" && <Leaf className="h-4 w-4" />}
										{g === "Bachelors" && <Crown className="h-4 w-4" />}
										{g === "Bachelorettes" && <Gem className="h-4 w-4" />}
										{g === "Villagers" && <Users className="h-4 w-4" />}
										<span className="hidden sm:inline">{g}</span>
									</button>
								))}
							</div>
							<div className="flex-1" />
							<div className="relative">
								<Input
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									placeholder="Search name, favorite, loves, likes, dislikes..."
									className="w-full sm:w-72 md:w-80 lg:w-96 xl:w-[28rem] pl-9 pr-3 py-2 h-9 sm:h-10 rounded-lg border bg-background/70 backdrop-blur focus:outline-none focus:ring-2 focus:ring-ring text-base"
								/>
								<Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
							</div>
						</div>
						<div className={`overflow-y-auto pr-1 hm-scrollbar max-h-[20vh]`}>
							<div
								ref={thumbnailsRef}
								className="grid gap-2 sm:gap-3 md:gap-4 [grid-template-columns:repeat(auto-fit,minmax(76px,1fr))] sm:[grid-template-columns:repeat(auto-fit,minmax(96px,1fr))] md:[grid-template-columns:repeat(auto-fit,minmax(104px,1fr))] overflow-x-hidden"
							>
								{filtered.map((r, idx) => (
									<button
										key={r.name}
										data-index={idx}
										onClick={() => {
											// Clear all filters when clicking on a resident (mobile only)
											if (isMobile) {
												setQuery("");
												setGroup("All");
											}
											selectByName(r.name);
											// Auto-collapse footer on mobile after selection
											if (isMobile) {
												setFooterExpanded(false);
											}
										}}
										className={`group p-[2px] sm:p-[2px] rounded-xl bg-gradient-to-br from-[color-mix(in_oklab,var(--chart-2),transparent_50%)] via-[color-mix(in_oklab,var(--chart-1),transparent_50%)] to-[color-mix(in_oklab,var(--chart-3),transparent_50%)] transition ${
											r.name === selectedName
												? "opacity-100"
												: "opacity-70 hover:opacity-100"
										}`}
										title={r.name}
									>
										<div
											className={`rounded-xl p-1 sm:p-1.5 md:p-2 bg-background border w-full flex flex-col items-center gap-1 ${r.name === selectedName ? "ring-2 ring-[var(--chart-2)]/70" : ""}`}
										>
											<img
												src={toAvatarFilename(r.name)}
												onError={(e) => {
													(e.currentTarget as HTMLImageElement).src =
														withBase("/vite.svg");
												}}
												alt={r.name}
												className="h-9 w-9 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full object-cover bg-secondary"
												loading="lazy"
											/>
											<span className="text-[10px] sm:text-xs md:text-[13px] leading-tight text-center">
												{r.name}
											</span>
										</div>
									</button>
								))}
							</div>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
