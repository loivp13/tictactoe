import classnames from "classnames";
export default {
  ScoreBoard: () => {
    return classnames(
      "ScoreBoard",
      "bg-white",
      "w-2/5",
      "h-1/10",
      "flex",
      "justify-between",
      "items-center"
    );
  },
  Container: () => {
    return classnames("Container", "flex", "justify-around", "w-full");
  },
  Box: () => {
    return classnames(
      "Box",
      "w-1/2",
      "flex",
      "justify-center",
      "items-center",
      "text-3xl"
    );
  },
};
