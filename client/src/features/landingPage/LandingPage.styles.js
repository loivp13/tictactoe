import classnames from "classnames";

export default {
  LandingPage: () => {
    return classnames(
      "LandingPage",
      "bg-th-background",
      "flex",
      "h-screen",
      "w-screen",
      "flex-col",
      "items-center"
    );
  },
  Header: () => {
    return classnames("text-xl");
  },
  MainContainer: () => {
    return classnames(
      "MainContainer",
      "w-9/10",
      "h-9/10",
      "flex",
      "justify-around",
      "items-center"
    );
  },
  BoxRight: () => {
    return classnames("w-50");
  },
  BoxLeft: () => {
    return classnames("w-50");
  },
};
