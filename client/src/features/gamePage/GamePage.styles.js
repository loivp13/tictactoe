import classnames from "classnames";
export default {
  GamePage: () => {
    return classnames(
      "GamePage",
      "w-full",
      "h-screen",
      "overflow-hidden",
      "p-3"
    );
  },
  Main: () => {
    return classnames(
      "Main",
      "w-full",
      "h-full",
      "flex",
      "flex-col",
      "items-center"
    );
  },
  Header: () => {
    return classnames(
      "Header",
      "text-4xl",
      "text-white",
      "text-center",
      "h-1/10",
      "my-12"
    );
  },
  ScoreBoard: () => {
    return classnames("MiddleBox", "w-1/5", "h-1/10", "bg-white");
  },
  Row: () => {
    return classnames("Row", "flex", "justify-between", "h-4/5", "w-full");
  },
  ChatBox: () => {
    return classnames(
      "ChatBox",
      "w-1/5",
      "h-full",
      "bg-green-500",
      "flex",
      "flex-col",
      "justify-between"
    );
  },
  MessageBoard: () => {
    return classnames(
      "MessageBoard",
      "h-full",
      "bg-white",
      "m-3",
      "overflow-scroll",
      "hide-scrollbar"
    );
  },
  MessageBoardItem: (roomid) => {
    return classnames("MessageBoardItem", "px-3", "text-xl", {});
  },
  ChatInputContainer: () => {
    return classnames("ChatInputContainer", "h-1/10", "px-3", "w-full");
  },
  ChatForm: () => {
    return classnames(" C  hatF orm", "flex");
  },
  ChatInput: () => {
    return classnames("ChatInput", "h-full", "w-full", "p-3");
  },
  ChatButton: () => {
    return classnames("ChatButton", "bg-white", "p-2", "rounded", "border");
  },
  RightBox: () => {
    return classnames("RightBox", "w-4/5", "h-full", "bg-indigo-800");
  },
};