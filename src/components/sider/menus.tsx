import { FileImageOutlined } from "@ant-design/icons";
import {
  BuildingStorefrontIcon,
  CalculatorIcon,
  MegaphoneIcon,
  Squares2X2Icon,
  UserCircleIcon,
  UserGroupIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";
import { Link } from "@tanstack/react-router";
import { Badge, MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

export const MenuItens = (pending?: number) => {
  return [
    {
      key: "DASHBOARD",
      title: "Dashboard",
      label: <Link to="/dashboard">Dashboard</Link>,
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
      label: <Link to="/clients">Clientes</Link>,
      icon: <UserGroupIcon width={24} />,
    },
    {
      key: "TERMINAIS",
      title: "Terminais",
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: 6,
          }}
        >
          Terminais <Badge size="small" color="green" count={pending}></Badge>
        </div>
      ),
      icon: <CalculatorIcon width={pending ? 20 : 24} />,
      children: [
        {
          key: "TERMINAIS_GERAL",
          label: <Link to="/terminals">Geral</Link>,
        },
        {
          key: "TERMINAIS_PENDENTES",
          label: (
            <Link
              to="/terminals/pending"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingRight: 6,
              }}
            >
              Pendentes{" "}
              <Badge size="small" color="green" count={pending}></Badge>
            </Link>
          ),
        },
        {
          key: "TERMINAIS_RASTREAMENTOS",
          label: <Link to="/terminals/tracking">Rastreamento</Link>,
        },
        {
          key: "TERMINAIS_ADQUIRENTES",
          label: <Link to="/terminals/acquirers">Adquirentes</Link>,
        },
        {
          key: "TERMINAIS_MODELOS",
          label: <Link to="/terminals/models">Modelos</Link>,
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
          label: <Link to="/users">Geral</Link>,
        },
        {
          key: "LOGS",
          label: <Link to="/users/logs">Central de logs</Link>,
        },
      ],
    },
    {
      key: "REPORTS",
      title: "Relatórios",
      label: <Link to="/reports">Relatórios</Link>,
      icon: <DocumentIcon width={24} />,
    },
  ];
};
