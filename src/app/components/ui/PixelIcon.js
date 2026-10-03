// Tiny pixel-art icons that match the game. Drawn in currentColor.
const ICONS = {
  plug: ["..#...#..", "..#...#..", "#########", "#########", ".#######.", "..#####..", "...###...", "....#....", "....#...."],
  bulb: ["..#####..", ".#######.", "#########", "#########", "#########", ".#######.", "..#####..", "..#...#..", "..#####..", "...###..."],
  house: ["....#....", "...###...", "..##.##..", ".##...##.", "##.....##", ".#.....#.", ".#.##..#.", ".#.##..#.", ".#######."],
  fridge: [".#######.", ".#.....#.", ".#.#...#.", ".#.....#.", ".#######.", ".#.#...#.", ".#.....#.", ".#.....#.", ".#######."],
};

export default function PixelIcon({ name, className = "h-5 w-5" }) {
  const bm = ICONS[name];
  if (!bm) return null;

  return (
    <svg
      viewBox={`0 0 ${bm[0].length} ${bm.length}`}
      className={className}
      fill="currentColor"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {bm.flatMap((row, y) =>
        [...row].map((c, x) =>
          c === "#" ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} /> : null,
        ),
      )}
    </svg>
  );
}
