import classnames from "classnames";
export default {
  RestartGameModal: () => {
    return classnames(
      "RestartGameModal",
      "w-full",
      "h-full",
      "flex",
      "justify-center",
      "items-center",
      "bg-opacity-0",
      "absolute",
      "z-10"
    );
  },
};
