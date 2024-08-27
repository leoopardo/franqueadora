import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

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

  const debounceSetBreadcrumbs = (newBreadcrumbs: BreadcrumbItemType[]) => {
    setTimeout(() => {
      setBreadcrumbs(newBreadcrumbs);
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
