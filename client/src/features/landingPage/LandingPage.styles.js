import classnames from "classnames";

export default {
  LandingPage: () => {
    return classnames(
      "LandingPage",
      "bg-blue-700",
      "flex",
      "h-screen",
      "w-screen",
      "flex-col",
      "items-center"
    );
  },
  ErrorMessages: () => {
    return classnames(
      "absolute",
      "top-0",
      "transform",
      "-translate-y-full",
      "text-white"
    );
  },
  Header: () => {
    return classnames("Header", "text-8xl", "text-white");
  },
  Label: () => {
    return classnames("text-xl", "text-white", "m-2");
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
    return classnames(
      "BoxRight",
      "w-1/2",
      "h-1/2",
      "bg-red-500",
      "flex",
      "flex-col",
      "m-2",
      "relative"
    );
  },
  BoxLeft: () => {
    return classnames(
      "Boxleft",
      "w-1/2",
      "h-1/2",
      "bg-blue-500",
      "flex",
      "flex-col",
      "m-2",
      "relative"
    );
  },
  Form: () => {
    return classnames(
      "Form",
      "flex",
      "flex-col",
      "bg-white-500",
      "p-5",
      "h-full",
      "m-2"
    );
  },
  FormHeader: () => {
    return classnames(
      "FormHeader",
      "text-3xl",
      "text-white",
      "text-center",
      "my-5"
    );
  },
  Input: () => {
    return classnames("Inout", "p-5", "mb-3");
  },
  Button: () => {
    return classnames(
      "Button",
      "mt-auto",
      "bg-white",
      "p-5",
      "w-1/2",
      "mx-auto",
      "uppercase"
    );
  },
};
