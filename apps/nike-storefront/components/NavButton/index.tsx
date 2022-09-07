import { ButtonHTMLAttributes } from "react";
import type { FC } from "react";
import Bag from "./bagIcon.svg";
import Close from "./closeIocn.svg";
import MenuIcon from "./menuIcon.svg";
import Spyglass from "./spyglassIcon.svg";
import User from "./userIcon.svg";

interface NavButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: "user" | "bag" | "spyglass" | "menu" | "close";
  counter?: number;
}

const getIcon = (iconName: NavButtonProps["icon"]) => {
  switch (iconName) {
    case "user":
      return <User />;
    case "bag":
      return <Bag />;
    case "spyglass":
      return <Spyglass />;
    case "menu":
      return <MenuIcon />;
    case "close":
      return <Close />;
    default:
      return iconName;
  }
};

export const NavButton: FC<NavButtonProps> = ({ icon, counter, ...rest }) => {
  return (
    <button type="button" className="" {...rest}>
      {getIcon(icon)}
      {!!counter && <span className="">{counter}</span>}
    </button>
  );
};
