import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { useParams } from "react-router-dom";

interface ReportsPageContextProps {
  breadcrumbs: BreadcrumbItemType[];
  setBreadcrumbs: Dispatch<SetStateAction<BreadcrumbItemType[]>>;
  setDebounceBreadcrumbs: (newBreadcrumbs: BreadcrumbItemType[]) => void;
}

const ReportsPageContext = createContext<ReportsPageContextProps | undefined>(
  undefined
);

export const ReportsPageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItemType[]>([]);
  const { event_id } = useParams();

  const debounceSetBreadcrumbs = (newBreadcrumbs: BreadcrumbItemType[]) => {
    setTimeout(() => {
      setBreadcrumbs([
        { title: "Eventos", href: "/eventos" },
        { title: "nome do evento", href: `/evento/${event_id}` },
        ...newBreadcrumbs,
      ]);
    }, 100);
  };

  return (
    <ReportsPageContext.Provider
      value={{
        breadcrumbs,
        setBreadcrumbs,
        setDebounceBreadcrumbs: debounceSetBreadcrumbs,
      }}
    >
      {children}
    </ReportsPageContext.Provider>
  );
};

export function useReportsPage() {
  const context = useContext(ReportsPageContext);
  if (context === undefined) {
    throw new Error("usePageContext must be used within a TokenProvider");
  }
  return context;
}
