import { PageHeader } from "@components/header/pageHeader";
import TableComponent from "@components/table/tableComponent";
import {
  EventParams,
  EventType,
} from "../../../services/events/__interfaces/events.interface";
import { useActivateEvent } from "../../../services/events/activateEvent";
import { useInactivateEvent } from "../../../services/events/inactivateEvent";
import { useListEvents } from "../../../services/events/listEvents";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useBreakpoints } from "@hooks/useBreakpoints";
import useDebounce from "@hooks/useDebounce";
import defaultTheme from "@styles/default";
import {
  Button,
  Calendar,
  Col,
  Input,
  Popconfirm,
  Row,
  Select,
  Switch,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { formatCpfCnpj } from "@utils/regexFormat";
import { CalendarProps } from "antd/lib";
import { SearchOutlined } from "@ant-design/icons";
import { getPermission } from "../../../utils/getUserPermission";

const month = {
  1: "JAN",
  2: "FEV",
  3: "MAR",
  4: "ABR",
  5: "MAI",
  6: "JUN",
  7: "JUL",
  8: "AGO",
  9: "SET",
  10: "OUT",
  11: "NOV",
  12: "DEZ",
};

export const Events = () => {
  const [params, setParams] = useState<EventParams>({ page: 1, size: 15 });
  const { data, isLoading } = useListEvents(params);
  const inactivate = useInactivateEvent();
  const activate = useActivateEvent();
  const { isSm } = useBreakpoints();
  const navigate = useNavigate();
  const [viewType, setViewType] = useState<"board" | "calendar">("board");

  const debounceSearch = useDebounce((value) => {
    if (!value) {
      setParams((state) => ({
        ...state,
        s: undefined,
        f: undefined,
      }));
      return;
    }
    setParams((state) => ({
      ...state,
      s: value,
      f: "sub_name,Event.name,Event.Client.name,Event.Client.document,Event.Promoter.name,Event.Promoter.document,Event.Modules.POSModule.name".split(
        ","
      ),
    }));
  }, 500);

  const dateCellRender = (date: any) => {
    const formattedDate = date.format("YYYY-MM-DD");
    const events = data?.items.filter(
      (event) => moment(event.start_time).format("YYYY-MM-DD") === formattedDate
    );

    return (
      <div>
        {events && events?.length > 0 && (
          <ul>
            {events.map((event, index) => (
              <li key={index}>
                <Tag
                  color={defaultTheme["primary-300"]}
                  onClick={() => navigate(`/eventos/edição`, { state: event })}
                >
                  {event.name}
                </Tag>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  const monthCellRender = (date: any) => {
    const formattedMonth = date.format("YYYY-MM");
    const events = data?.items.filter(
      (event) => moment(event.start_time).format("YYYY-MM") === formattedMonth
    );

    return (
      <div>
        {events && events.length > 0 && (
          <ul>
            {events.map((event, index) => (
              <li key={index}>
                <Tag
                  color={defaultTheme["primary-300"]}
                  onClick={() => navigate(`/eventos/edição`, { state: event })}
                >
                  {event.name}
                </Tag>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  const cellRender: CalendarProps<any>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return (
    <Row
      style={{ width: "100%", padding: isSm ? 12 : "20px 40px 20px 40px" }}
      align="middle"
      gutter={[8, 8]}
    >
      <Col
        xs={{ span: 24 }}
        md={{ span: getPermission("EVENTOS_CADASTRO", "create") ? 12 : 17 }}
      >
        <PageHeader
          title="Eventos"
          subtitle="Visualize e gerencie seus eventos."
        />
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 7 }}>
        <Input
          size="large"
          allowClear
          onChange={({ target }) => debounceSearch(target.value)}
          placeholder="Pesquisar evento"
          style={{ borderRadius: 32 }}
          suffix={<SearchOutlined style={{ width: 16 }} />}
        />
      </Col>
      {getPermission("EVENTOS_CADASTRO", "create") && (
        <Col xs={{ span: 24 }} md={{ span: 5 }}>
          <Link to={"cadastro"}>
            <Tooltip
              title={
                !localStorage.getItem("tenant") &&
                localStorage.getItem("master")
                  ? "Você deve acessar uma franquia para realizar cadastros"
                  : undefined
              }
            >
              <Button
                style={{ width: "100%" }}
                size="large"
                type="primary"
                shape="round"
                disabled={
                  !localStorage.getItem("tenant") &&
                  localStorage.getItem("master")
                    ? true
                    : false
                }
              >
                Cadastrar evento
              </Button>
            </Tooltip>
          </Link>
        </Col>
      )}
      <Col span={24} style={{ display: "flex", flexDirection: "row-reverse" }}>
        <Select
          options={[
            { label: "Tabela", value: "board" },
            { label: "Calendário", value: "calendar" },
          ]}
          onChange={(value) => {
            setViewType(value);
            value === "calendar"
              ? setParams((state) => ({ ...state, page: 1, size: 1000 }))
              : setParams((state) => ({ ...state, page: 1, size: 15 }));
          }}
          value={viewType}
        />
      </Col>
      <Col span={24}>
        {viewType === "board" ? (
          <TableComponent<EventType>
            loading={isLoading}
            data={data}
            params={params}
            setParams={setParams}
            actions={
              getPermission("EVENTOS_CADASTRO", "create")
                ? [
                    {
                      label: "Editar",
                      onClick: (row) => navigate(`edição`, { state: row }),
                      icon: <PencilIcon style={{ width: 16 }} />,
                    },
                  ]
                : undefined
            }
            columns={[
              {
                key: "active",
                head: "Status",
                custom: (row) => (
                  <Popconfirm
                    placement="topLeft"
                    title={`${row.active ? "Inativar" : "Ativar"} evento?`}
                    description={`Tem certeza que deseja ${row.active ? "inativar" : "ativar"} o evento?`}
                    okText={`Sim, ${row.active ? "inativar" : "ativar"}`}
                    cancelText="Não, cancelar."
                    onConfirm={() => {
                      row.active
                        ? inactivate.mutate({
                            body: { active: false },
                            id: row.id ?? "",
                          })
                        : activate.mutate({
                            body: { active: true },
                            id: row.id ?? "",
                          });
                    }}
                  >
                    <Switch
                      checked={row.active}
                      loading={inactivate.isLoading || activate.isLoading}
                    />
                  </Popconfirm>
                ),
              },
              {
                key: "ref_id",
                head: "Cód. do evento",
                custom(row) {
                  return (
                    <Typography.Text copyable>{row.ref_id}</Typography.Text>
                  );
                },
              },
              {
                key: "start_time",
                head: "Dia",
                custom(row) {
                  const m = moment(row.start_time ?? "").get("M") + 1;
                  const d = moment(row.start_time ?? "").get("D");
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 4,
                        width: 40,
                      }}
                    >
                      <Typography.Text
                        style={{ color: defaultTheme.primary, margin: 0 }}
                      >
                        {(month as any)[m]}
                      </Typography.Text>
                      <Typography.Title style={{ margin: 0 }} level={3}>
                        {d}
                      </Typography.Title>
                    </div>
                  );
                },
              },
              {
                key: "name",
                head: "Evento",
                custom: (row) => (
                  <Row gutter={[4, 4]}>
                    <Col span={24}>
                      <Typography.Text>{row?.name}</Typography.Text>
                    </Col>
                    <Col span={24}>
                      <Typography.Text style={{ color: "#71717A" }}>
                        {new Date(row?.start_time || "").toLocaleString()}
                      </Typography.Text>
                    </Col>
                  </Row>
                ),
                width: 180,
              },
              {
                key: "type",
                head: "Tipo",
                custom(row) {
                  return (
                    <Typography.Text style={{ textTransform: "capitalize" }}>
                      {row.type?.toLocaleLowerCase()}
                    </Typography.Text>
                  );
                },
                width: 80,
              },
              {
                key: "promoter_name",
                head: "Promotor",
                custom: (row) => (
                  <Row gutter={[4, 4]}>
                    <Col span={24}>
                      <Typography.Text>
                        {row?.promoter_name ?? "-"}
                      </Typography.Text>
                    </Col>
                    <Col span={24}>
                      <Typography.Text copyable style={{ color: "#71717A" }}>
                        {row?.promoter_document
                          ? formatCpfCnpj(row?.promoter_document)
                          : "-"}
                      </Typography.Text>
                    </Col>
                  </Row>
                ),
                width: 200,
              },
              {
                key: "client_name",
                head: "Cliente",
                custom: (row) => (
                  <Row gutter={[4, 4]}>
                    <Col span={24}>
                      <Typography.Text>
                        {row?.client_name ?? "-"}
                      </Typography.Text>
                    </Col>
                    <Col span={24}>
                      {row?.client_document && (
                        <Typography.Text copyable style={{ color: "#71717A" }}>
                          {formatCpfCnpj(row?.client_document)}
                        </Typography.Text>
                      )}
                    </Col>
                  </Row>
                ),
                width: 200,
              },
            ]}
          />
        ) : (
          <Calendar cellRender={cellRender} />
        )}
      </Col>
    </Row>
  );
};
