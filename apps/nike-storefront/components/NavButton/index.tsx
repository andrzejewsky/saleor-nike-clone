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
    <button type="button" className="relative" {...rest}>
      {getIcon(icon)}
      {!!counter && (
        <span className="rounder bg-indigo-500 px-1.5 py-1 text-slate-50 rounded font-indigo text-[8px] absolute -right-2 -bottom-2">
          {counter}
        </span>
      )}
    </button>
  );
};
