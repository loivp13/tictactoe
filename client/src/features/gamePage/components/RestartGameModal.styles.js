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
      "z-10",
      "bg-blue-500"
    );
  },
  Container: () => {
    return classnames(
      "Container",
      "w-1/2",
      "h-1/2",
      "bg-blue-500",
      "flex",
      "flex-col",
      "justify-center",
      "items-center"
    );
  },
  Header: () => {
    return classnames("Header", "text-3xl", "text-white");
  },
  Main: () => {
    return classnames(
      "Main",
      "text-xl",
      "w-9/10",
      "flex",
      "justify-center",
      "items-center"
    );
  },
  Button: () => {
    return classnames(
      "Button",
      "p-2",
      "bg-green-500",
      "border",
      "rounded",
      "border-green-500",
      "text-white",
      "mt-1/4",
      "cursor-pointer",
      "w-1/2",
      "h-auto",
      "text-lg",
      "text-center",
      "whitespace-nowrap"
    );
  },
  ButtonRed: () => {
    return classnames(
      "Button",
      "p-2",
      "bg-red-500",
      "border",
      "rounded",
      "border-red-500",
      "text-white",
      "mt-1/4",
      "cursor-pointer",
      "w-1/2",
      "h-auto",
      "text-lg",
      "text-center",
      "whitespace-nowrap"
    );
  },
};
