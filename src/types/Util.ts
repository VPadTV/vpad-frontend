import { ReactNode } from "react";

type PropsWithChildren<P = unknown> = P & { children?: ReactNode | ReactNode[] | undefined };

export type Component<P = {}> = React.FC<PropsWithChildren<P>>;

export type UserProfile = {
  id: string,
  username: string,
  nickname: string,
  email: string,
  profilePhotoUrl: string | null,
  about: string | null,
  contact: string | null,
  admin: boolean,
  createdAt: string
}