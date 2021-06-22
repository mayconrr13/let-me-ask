import { ButtonHTMLAttributes } from "react";

import './styles.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export function Button({text, ...rest}: ButtonProps) {
  return (
    <button {...rest} className="button-component">{text}</button>
  )
}