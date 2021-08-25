import classnames from "classnames";
export default {
  BettingModal: () => {
    return classnames(
      "BettingModal",
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
  BettingModalContainer: () => {
    return classnames(
      "BettingModalContainer",
      "w-2/5",
      "h-2/5",
      "bg-pink-900",
      "flex",
      "flex-col",
      "items-center",
      "justify-around"
    );
  },
  Header: () => {
    return classnames(
      "Header",
      "w-9/10",
      "text-white",
      "flex",
      "justify-center",
      "text-4xl"
    );
  },
  Main: () => {
    return classnames(
      "Main",
      "bg-opacity-0",
      "flex",
      "justify-center",
      "items-center",
      "h-1/3",
      "w-full"
    );
  },
  NumDisplay: () => {
    return classnames(
      "NumDisplay",
      "text-white",
      "text-8xl",
      "text-left",
      "w-1/3"
    );
  },
  Input: () => {
    return classnames(
      "Input",
      "bg-pink-900",
      "text-8xl",
      "text-right",
      "text-white",
      "placeholder-white",
      "outline-none",
      "w-1/3"
    );
  },
  ButtonsContainer: () => {
    return classnames(
      "ButtonsContainer",
      "h-1/3",
      "w-3/4",
      "flex",
      "justify-around",
      "items-center"
    );
  },
  Button: () => {
    return classnames(
      "Button",
      "text-white",
      "text-4xl",
      "border",
      "border-white",
      "rounded",
      "text-center",
      "p-4",
      "w-1/5",
      "cursor-pointer"
    );
  },
};
