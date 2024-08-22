import { getPermission } from "@franchise/utils/getUserPermission";
import {
  CalculatorIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  MegaphoneIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export const MenuItens: any = (
  pending: number,
  promoter?: boolean,
  client?: boolean
) => {
  const items: any = [
    ,
    // {
    //   key: "dashboard",
    //   name: "Dashboard",
    //   path: "/dashboard",
    //   icon: <Squares2X2Icon width={24} />,
    //   disabled: true,
    // },

    {
      key: "eventos",
      name: "Eventos",
      path: "/eventos",
      icon: <CalendarDaysIcon width={24} />,
      disabled: !getPermission("EVENTOS_CADASTRO", "view"),
    },
    {
      key: "terminais",
      name: "Terminais",
      path: "/terminais",
      icon: <CalculatorIcon width={pending ? 20 : 24} />,
      disabled: !getPermission("TERMINAIS_GERENCIAMENTO", "view"),
    },
    {
      key: "login-backoffice",
      name: "Login Backoffice",
      path: "/login",
      icon: <UserGroupIcon width={24} />,
      disabled: !getPermission("LOGIN_BACKOFFICE", "view"),
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
    // {
    //   key: "cancelamentos",
    //   name: "Cancelamentos",
    //   path: "/cancelamentos",
    //   icon: <ArchiveBoxXMarkIcon width={24} />,
    //   disabled: true,
    // },
    // {
    //   key: "notificações",
    //   name: "Notificações",
    //   path: "/notificações",
    //   icon: <BellAlertIcon width={24} />,
    //   disabled: true,
    // },
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
          disabled: !getPermission("FICHAS_CARDARPIO", "view"),
        },
        {
          key: "usuarios-terminal",
          name: "Usuários do terminal",
          path: "/fichas/usuarios-terminal",
        },
      ],
    },
    // {
    //   key: "ingressos",
    //   name: "Ingressos",
    //   path: "/ingressos",
    //   icon: <TicketIcon width={24} />,
    //   disabled: true,
    // },
    // {
    //   key: "reports",
    //   name: "Relatórios",
    //   path: "/reports",
    //   icon: <DocumentIcon width={24} />,
    //   disabled: true,
    // },
  ];

  if (!promoter && !client) {
    items.splice(0, 0, {
      key: "promotores",
      name: "Promotores",
      path: "/promotores",
      icon: <MegaphoneIcon width={24} />,
    });
  }
  if (!client) {
    items.splice(1, 0, {
      key: "clientes",
      name: "Clientes",
      path: "/clientes",
      icon: <UserGroupIcon width={24} />,
    });
  }
  return items;
};
