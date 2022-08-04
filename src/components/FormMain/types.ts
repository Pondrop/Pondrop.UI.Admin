import { FormEventHandler, ReactNode } from "react";

export interface FormMainProps {
  children: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
}