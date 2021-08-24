import classnames from "classnames";
export default {
  GameBoard: () => {
    return classnames(
      "GameBoard",
      "w-4/5",
      "h-full",
      "bg-indigo-800",
      "p-3",
      "relative"
    );
  },
  Main: () => {
    return classnames(
      "Main",
      "p-24",
      "w-full",
      "h-full",
      "bg-white",
      "grid",
      "grid-flow-row",
      "grid-cols-3",
      "grid-rows-3"
    );
  },
  LogoutButton: () => {
    return classnames(
      "LogoutButton",
      "bg-red-500",
      "cursor-pointer",
      "absolute",
      "px-6",
      "py-4",
      "rounded-xl",
      "border",
      "transform",
      "translate-y-full"
    );
  },
  Tile: (border) => {
    return classnames(
      "Tile",
      border,
      "border-black",
      "flex",
      "items-center",
      "justify-center",
      "text-8xl"
    );
  },
  PlayButton: (playersCount) => {
    let border =
      playersCount > 1 ? "bg-green-400 cursor-pointer" : "bg-gray-500";
    return classnames(
      "PlayButton",
      "px-8",
      "py-4",
      "absolute",
      border,
      "rounded-xl",
      "border"
    );
  },
};
