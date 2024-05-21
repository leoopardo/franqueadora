import {
  BuildingStorefrontIcon,
  CalculatorIcon,
  MegaphoneIcon,
  Squares2X2Icon,
  UserCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { Link } from "@tanstack/react-router";
import { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

export const MenuItens: MenuItem[] = [
  {
    key: "DASHBOARD",
    title: "Dashboard",
    label: <Link>Dashboard</Link>,
    icon: <Squares2X2Icon width={24} />,
  },
  {
    key: "FRANQUIAS",
    title: "Franquias",
    label: <Link to="/franchises">Franquias</Link>,
    icon: <BuildingStorefrontIcon width={24} />,
  },
  {
    key: "PROMOTORES",
    title: "Promotores",
    label: <Link to="/promoters">Promotores</Link>,
    icon: <MegaphoneIcon width={24} />,
  },
  {
    key: "CLIENTES",
    title: "Clientes",
    label: <Link>Clientes</Link>,
    icon: <UserGroupIcon width={24} />,
  },
  {
    key: "TERMINAIS",
    title: "Terminais",
    label: "Terminais",
    icon: <CalculatorIcon width={24} />,
    children: [
      {
        key: "TERMINAIS_GERAL",
        label: <Link>Geral</Link>,
      },
    ],
  },
  {
    key: "USUARIOS",
    title: "Usuários",
    label: "Usuários",
    icon: <UserCircleIcon width={24} />,
    children: [
      {
        key: "USUARIOS_GERAL",
        label: <Link>Geral</Link>,
      },
    ],
  },
];
