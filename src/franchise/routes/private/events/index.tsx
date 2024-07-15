import { PageHeader } from "@components/header/pageHeader";
import TableComponent from "@components/table/tableComponent";
import {
  EventParams,
  EventType,
} from "@franchise/services/events/__interfaces/events.interface";
import { useActivateEvent } from "@franchise/services/events/activateEvent";
import { useInactivateEvent } from "@franchise/services/events/inactivateEvent";
import { useListEvents } from "@franchise/services/events/listEvents";
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
  Typography,
} from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { formatCpfCnpj } from "@utils/regexFormat";
import { CalendarProps } from "antd/lib";

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
      f: ["franchise_name", "cnpj", "ref_id", "username"],
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
                  onClick={() => navigate(`/eventos/editar/${event.id}`)}
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
                  onClick={() => navigate(`/eventos/editar/${event.id}`)}
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
      style={{ width: "100%", padding: isSm ? 12 : 40 }}
      align="middle"
      gutter={[8, 8]}
    >
      <Col xs={{ span: 24 }} md={{ span: 12 }}>
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
        />
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 5 }}>
        <Link to={"cadastro"}>
          <Button
            style={{ width: "100%" }}
            size="large"
            type="primary"
            shape="round"
          >
            Cadastrar evento
          </Button>
        </Link>
      </Col>
      <Col span={24} style={{ display: "flex", flexDirection: "row-reverse" }}>
        <Select
          options={[
            { label: "Tabela", value: "board" },
            { label: "Calendário", value: "calendar" },
          ]}
          onChange={(value) => setViewType(value)}
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
            actions={[
              {
                label: "Editar",
                onClick: (row) => navigate(`edição/${row?.id}`, { state: row }),
                icon: <PencilIcon style={{ width: 16 }} />,
              },
            ]}
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
