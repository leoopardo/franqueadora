import { useGetEventById } from "@franchise/services/events/getEventById";
import { useUpdateEvent } from "@franchise/services/events/updateEvent";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { MutateFranchise } from "../components/mutate";

export const UpdateEvent = () => {
  const { state } = useLocation();
  const { mutate } = useUpdateEvent();
  const { data, isLoading } = useGetEventById(state?.id);

  function getParsedAgreements(agreements: any) {
    const PHYSICAL_PUB = agreements?.filter(
      (agreement: any) => agreement?.type === "PHYSICAL_PUB"
    );
    const agrupatedAgreements: any = [];
    if (!PHYSICAL_PUB) return agrupatedAgreements;
    for (const agreement of PHYSICAL_PUB) {
      const index = agrupatedAgreements.findIndex(
        (agreementAgrupated: any) =>
          agreementAgrupated?.debit_transaction_fee ===
            agreement.debit_transaction_fee &&
          agreementAgrupated?.credit_transaction_fee ===
            agreement.credit_transaction_fee &&
          agreementAgrupated?.antecipation_fee === agreement?.antecipation_fee
      );

      if (index === -1) {
        agrupatedAgreements.push({
          brand: [agreement.brand],
          debit_transaction_fee: agreement.debit_transaction_fee,
          credit_transaction_fee: agreement.credit_transaction_fee,
          antecipation_fee: agreement.antecipation_fee,
          charge_type: agreement.charge_type,
        });
      } else {
        agrupatedAgreements[index].brand.push(agreement.brand);
      }
    }
    return agrupatedAgreements;
  }

  console.log(data);

  return (
    <div>
      <MutateFranchise
        title={`Editar evento ${state?.name}`}
        subtitle="Preencha todos os campos para editar o evento"
        getDataLoading={isLoading}
        initialValues={{
          ...data,
          DaysData: data?.days,
          street: data?.address,
          latitude: Number(data?.latitude) || null,
          longitude: Number(data?.longitude) || null,
          agreement: getParsedAgreements(data?.agreements),
          Modules: data?.modules,
        }}
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
            body: {
              ...body,
              address: body?.street || undefined,
              add_waiter_commission: undefined,
              accept_cashless: undefined,
              street: undefined,
              agreements_type: undefined,
              type: undefined,
              location: body.location.substring(0, 49),
              days: body?.DaysData?.map((day: any) => ({
                end_time: moment(day.end_time).toISOString(),
                start_time: moment(day.start_time).toISOString(),
                open_gates_time: moment(day.open_gates_time).toISOString(),
              })),
              modules: body.Modules,
              recurrence_type:
                body?.DaysData?.length > 1 ? "RECURRENT" : "UNIQUE",
              agreement: parseAgreements(body.agreement),
              DaysData: undefined,
              Modules: undefined,
              reveal_location_after: body.reveal_location_after || false,
              pub: {
                ...body.pub,
                add_waiter_comission: body.add_waiter_comission,
                accept_cashless: body.accept_cashless,
                menus: body.menus || [],
              },
            },
            id: state?.id,
          });
        }}
        update
      />
    </div>
  );
};
