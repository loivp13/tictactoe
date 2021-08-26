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
      "w-3/5",
      "h-3/5",
      "bg-blue-500",
      "flex",
      "flex-col",
      "items-center",
      "justify-around",
      "relative"
    );
  },
  CountDown: () => {
    return classnames("CountDown", "absolute", "left-0", "top-0");
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
  ErrorMessage: () => {
    return classnames(
      "ErrorMessage",
      "bg-white",
      "bold",
      "text-red-500",
      "w-2/3",
      "text-3xl",
      "flex",
      "justify-center"
    );
  },
  Form: () => {
    return classnames(
      "Form",
      "flex",
      "flex-col",
      "items-center",
      "justify-around",
      "h-7/10"
    );
  },
  Main: () => {
    return classnames(
      "Main",
      "bg-opacity-0",
      "flex",
      "justify-center",
      "items-center",
      "h-3/5",
      "w-full"
    );
  },
  NumDisplay: () => {
    return classnames(
      "NumDisplay",
      "text-white",
      "text-8xl",
      "text-left",
      "w-3/5",
      "h-full"
    );
  },
  Nums: () => {
    return classnames(
      "Nums",
      "h-full",
      "w-full",
      "flex",
      "justify-start",
      "items-center"
    );
  },
  FieldSet: () => {
    return classnames(
      "FieldSet",
      "bg-blue-500",
      "text-8xl",
      "text-right",
      "text-white",
      "w-3/5",
      "h-full"
    );
  },
  Input: () => {
    return classnames(
      "Input",
      "w-full",
      "h-full",
      "text-right",
      "bg-blue-500",
      "placeholder-white",
      "outline-none",
      "flex",
      "items-center",
      "justify-end"
    );
  },
  ButtonsContainer: () => {
    return classnames(
      "ButtonsContainer",
      "h-1/3",
      "w-full",
      "flex",
      "justify-around",
      "items-center"
    );
  },
  ButtonClear: () => {
    return classnames(
      "Button",
      "text-black",
      "text-4xl",
      "border",
      "border-white",
      "bg-white",
      "rounded",
      "text-center",
      "p-4",
      "w-1/6",
      "cursor-pointer",
      "flex",
      "justify-center"
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
      "w-1/6",
      "cursor-pointer",
      "flex",
      "justify-center"
    );
  },
  ButtonSubmit: () => {
    return classnames(
      "ButtonSubmit",
      "bg-white",
      "text-3xl",
      "w-fit",
      "px-12",
      "py-4",
      "border",
      "rounded",
      "border-white",
      "cursor-pointer"
    );
  },
};
