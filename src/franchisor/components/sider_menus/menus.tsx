import {
  BuildingStorefrontIcon,
  CalculatorIcon,
  DocumentIcon,
  MegaphoneIcon,
  Squares2X2Icon,
  UserCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { Badge } from "antd";

export const MenuItens = (pending: number) => {
  return [
    {
      key: "dashboard",
      name: "Dashboard",
      path: "/dashboard",
      icon: <Squares2X2Icon width={24} />,
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
      path: "/promoters",
      icon: <MegaphoneIcon width={24} />,
    },
    {
      key: "clientes",
      name: "Clientes",
      path: "/clients",
      icon: <UserGroupIcon width={24} />,
    },
    {
      key: "terminais",
      name: "Terminais",
      path: "/terminals",
      icon: (
        <Badge
          size="small"
          color="green"
          count={pending}
        >
          <CalculatorIcon width={pending ? 20 : 24} />
        </Badge>
      ),

      children: [
        {
          key: "terminais-geral",
          name: "Geral",
          path: "/terminals",
        },
        {
          key: "terminais-pendentes",
          name: "Pendentes",
          path: "/terminals/pending",
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
              <Badge size="small" color="green" count={pending}></Badge>
            </div>
          ),
        },
        {
          key: "terminais-rastreamentos",
          name: "Rastreamento",
          path: "/terminals/tracking",
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
      path: "/users",
      icon: <UserCircleIcon width={24} />,
      children: [
        {
          key: "usuarios-geral",
          name: "Geral",
          path: "/users",
        },
        {
          key: "logs",
          name: "Central de logs",
          path: "/users/logs",
        },
      ],
    },
    {
      key: "reports",
      name: "Relatórios",
      path: "/reports",
      icon: <DocumentIcon width={24} />,
    },
  ];
};
