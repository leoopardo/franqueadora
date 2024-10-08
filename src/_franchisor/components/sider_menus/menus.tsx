import {
  BuildingStorefrontIcon,
  CalculatorIcon,
  MegaphoneIcon,
  Squares2X2Icon,
  UserCircleIcon,
  UserGroupIcon
} from "@heroicons/react/24/outline";
import { Badge } from "antd";

export const MenuItens = (pending: number) => {
  return [
    {
      key: "dashboard",
      name: "Dashboard",
      path: "/dashboard",
      icon: <Squares2X2Icon width={24} />,
      disabled: true,
    },
    {
      key: "franquias",
      name: "Franquias",
      path: "/franquias",
      icon: <BuildingStorefrontIcon width={24} />,
    },
    {
      key: "promotores",
      name: "Promotores",
      path: "/promotores",
      icon: <MegaphoneIcon width={24} />,
    },
    {
      key: "clientes",
      name: "Clientes",
      path: "/clientes",
      icon: <UserGroupIcon width={24} />,
    },
    {
      key: "terminais",
      name: (<>Terminais  {pending >= 1 && <Badge size="small" color="green" count={pending} style={{marginLeft: 16}}/>}</> as any),
      path: "/terminals",
      icon: <CalculatorIcon width={24} />,

      children: [
        {
          key: "terminais-geral",
          name: "Geral",
          path: "/terminais",
        },
        {
          key: "terminais-pendentes",
          name: "Pendentes",
          path: "/terminais/pendentes",
          label: (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingRight: 6,
              }}
            >
              Pendentes{" "}
              {pending && (
                <Badge size="small" color="green" count={pending}></Badge>
              )}
            </div>
          ),
        },
        {
          key: "terminais-rastreamentos",
          name: "Rastreamento",
          path: "/terminals/tracking",
          disabled: true,
        },
        {
          key: "terminais-adquirentes",
          name: "Adquirentes",
          path: "/terminals/acquirers",
        },
        {
          key: "terminais-modelos",
          name: "Modelos",
          path: "/terminals/models",
        },
      ],
    },
    {
      key: "usuarios",
      name: "Usuários",
      path: "/usuários",
      icon: <UserCircleIcon width={24} />,
      children: [
        {
          key: "usuarios-geral",
          name: "Geral",
          path: "/usuários",
        },
        {
          key: "logs",
          name: "Central de logs",
          path: "/users/logs",
          disabled: true,
        },
      ],
    },
   
  ];
};
