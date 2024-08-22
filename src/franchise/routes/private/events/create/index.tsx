import { useCreateEvent } from "@franchise/services/events/createEvent";
import { MutateFranchise } from "../components/mutate";
import moment from "moment";

export const CreateEvent = () => {
  const { mutate } = useCreateEvent();
  return (
    <div>
      <MutateFranchise
        title="Cadastro de evento"
        subtitle="Preencha todos os campos para adicionar um novo evento"
        mutate={(body) => {
          function parseAgreements(agreements: any) {
            const agreementsList = [];
            for (const agreement of agreements) {
              const agrm = agreement?.brand?.map((brand: any) => ({
                ...agreement,
                antecipation_fee: +agreement?.antecipation_fee,
                credit_transaction_fee: +agreement?.credit_transaction_fee,
                debit_transaction_fee: +agreement?.debit_transaction_fee,
                emission_fee: 0,
                pix_transaction_fee: 0,
                brand,
                type: "PHYSICAL_PUB",
              }));
              agreementsList.push(...agrm);
            }
            return agreementsList;
          }

          mutate({
            ...body,
            address: body?.street || undefined,
            add_waiter_commission: undefined,
            accept_cashless: undefined,
            street: undefined,
            agreements_type: undefined,
            type: "PRESENCIAL",
            location: body.location.substring(0, 49),
            latitude: body.latitude && `${body.latitude}`,
            longitude: body.latitude && `${body.longitude}`,
            DaysData: body?.DaysData?.map((day: any) => ({
              end_time: moment(day.end_time).toISOString(),
              start_time: moment(day.start_time).toISOString(),
              open_gates_time: moment(day.open_gates_time).toISOString(),
            })),
            recurrence_type:
              body?.DaysData?.length > 1 ? "RECURRENT" : "UNIQUE",
            agreement: parseAgreements(body.agreement),
            pub: {
              ...body.pub,
              add_waiter_comission: body.add_waiter_comission,
              accept_cashless: body.accept_cashless,
              menu_ids: body.pub.menus?.map((menu: any) => menu.id),
              terminals: body.pub.terminals,
            },
          });
        }}
      />
    </div>
  );
};
