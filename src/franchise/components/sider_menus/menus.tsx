import {
  ArchiveBoxXMarkIcon,
  BellAlertIcon,
  CalculatorIcon,
  CalendarDaysIcon,
  DocumentIcon,
  DocumentTextIcon,
  MegaphoneIcon,
  Squares2X2Icon,
  TicketIcon,
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
      disabled: true,
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
      key: "eventos",
      name: "Eventos",
      path: "/eventos",
      icon: <CalendarDaysIcon width={24} />,
    },
    {
      key: "terminais",
      name: "Terminais",
      path: "/terminals",
      icon: (
        <Badge size="small" color="green" count={pending}>
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
      key: "login-backoffice",
      name: "Login Backoffice",
      path: "/login",
      icon: <UserGroupIcon width={24} />,
      children: [
        {
          key: "acesso-backoffice",
          name: "Acesso ao backoffice",
          path: "/login/acesso-backoffice",
        },
        {
          key: "acesso-relatórios",
          name: "Acesso aos relatórios",
          path: "/login/acesso-relatorios",
        },
      ],
    },
    {
      key: "cancelamentos",
      name: "Cancelamentos",
      path: "/cancelamentos",
      icon: <ArchiveBoxXMarkIcon width={24} />,
      disabled: true,
    },
    {
      key: "notificações",
      name: "Notificações",
      path: "/notificações",
      icon: <BellAlertIcon width={24} />,
      disabled: true,
    },
    {
      key: "fichas",
      name: "Fichas",
      path: "/fichas",
      icon: <DocumentTextIcon width={24} />,
      children: [
        {
          key: "produtos",
          name: "Produtos",
          path: "/fichas/produtos",
        },
        {
          key: "estoques",
          name: "Estoques",
          path: "/fichas/estoques",
        },
        {
          key: "cardapio",
          name: "Cardápio",
          path: "/fichas/cardapio",
        },
        {
          key: "usuarios-terminal",
          name: "Usuários do terminal",
          path: "/fichas/usuarios-terminal",
        },
      ],
    }, {
      key: "ingressos",
      name: "Ingressos",
      path: "/ingressos",
      icon: <TicketIcon width={24} />,
      disabled: true,
    },
    {
      key: "reports",
      name: "Relatórios",
      path: "/reports",
      icon: <DocumentIcon width={24} />,
      disabled: true,
    },
  ];
};
