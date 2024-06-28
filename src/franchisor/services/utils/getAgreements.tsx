import { useQuery } from "react-query";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchisorAuth } from "../../../contexts/franchisorAuthContext";
import ResponseI from "../__interfaces/response.interface";

export interface AgreementsI {
  id: string;
  type: string;
  key: string;
  name: string;
  description: string;
  value: string;
  value_type: string;
  active: true;
  created_at: string;
  updated_at: string;
}

const types = {
  antifraud: "ANTIFRAUD",
  credid_spread: "SPREAD_CREDIT_ADVANCE",
  credit_result: "RESULT_CREDIT_ADVANCE",
  pay365_fee: "FEE_PAY365",
  emission_fee: "FEE_EMISSION",
  franchisor_result: "RESULT_FRANCHISOR",
  transaction: "TRANSACTION",
};

const modules = ["ONLINE_TICKET"]

function parseAgreement(data?: AgreementsI[]) {
  if(!data) return undefined
  
  const ONLINE_TICKET = data.filter((a) => a.type === "ONLINE_TICKET");
  const PHYSICAL_TICKET_PRODUCER = data.filter(
    (a) => a.type === "PHYSICAL_TICKET_PRODUCER" && a.active
  );
  const PHYSICAL_TICKET_CONSUMER = data.filter(
    (a) => a.type === "PHYSICAL_TICKET_CONSUMER" && a.active
  );
  const ONLINE_PUB = data.filter(
    (a) => a.type === "ONLINE_PUB" && a.active
  );
  const PHYSICAL_PUB_PRODUCER = data.filter(
    (a) => a.type === "PHYSICAL_PUB_PRODUCER" && a.active
  );
  const PHYSICAL_PUB_CONSUMER = data.filter(
    (a) => a.type === "PHYSICAL_PUB_CONSUMER" && a.active
  );
  const DIRECT_TRANSACTION = data.filter(
    (a) => a.type === "DIRECT_TRANSACTION" && a.active
  );

  return {
    online_ticket_antifraude: ONLINE_TICKET.find(
      (a) => a.key === types.antifraud
    )?.value,
    online_ticket_transaction: ONLINE_TICKET.find(
      (a) => a.key === types.transaction
    )?.value,
    online_ticket_pay365_fee: ONLINE_TICKET.find(
      (a) => a.key === types.pay365_fee
    )?.value,
    online_ticket_franchisor_result: ONLINE_TICKET.find(
      (a) => a.key === types.franchisor_result
    )?.value,
    online_ticket_credit_result: ONLINE_TICKET.find(
      (a) => a.key === types.credit_result
    )?.value,
    online_ticket_credit_spread: ONLINE_TICKET.find(
      (a) => a.key === types.credid_spread
    )?.value,

    physical_consumer_ticket_emission: PHYSICAL_TICKET_CONSUMER.find(
      (a) => a.key === types.emission_fee
    )?.value,
    physical_consumer_ticket_pay365_fee: PHYSICAL_TICKET_CONSUMER.find(
      (a) => a.key === types.pay365_fee
    )?.value,
    physical_consumer_ticket_franchisor_result: PHYSICAL_TICKET_CONSUMER.find(
      (a) => a.key === types.franchisor_result
    )?.value,
    physical_consumer_ticket_credit_result: PHYSICAL_TICKET_CONSUMER.find(
      (a) => a.key === types.credit_result
    )?.value,
    physical_consumer_ticket_credit_spread: PHYSICAL_TICKET_CONSUMER.find(
      (a) => a.key === types.credid_spread
    )?.value,
    
    physical_producer_ticket_emission: PHYSICAL_TICKET_PRODUCER.find(
      (a) => a.key === types.emission_fee
    )?.value,
    physical_producer_ticket_pay365_fee: PHYSICAL_TICKET_PRODUCER.find(
      (a) => a.key === types.pay365_fee
    )?.value,
    physical_producer_ticket_franchisor_result: PHYSICAL_TICKET_PRODUCER.find(
      (a) => a.key === types.franchisor_result
    )?.value,
    physical_producer_ticket_credit_spread: PHYSICAL_TICKET_PRODUCER.find(
      (a) => a.key === types.credid_spread
    )?.value,

    online_bar_antifraude: ONLINE_PUB.find(
      (a) => a.key === types.antifraud
    )?.value,
    online_bar_transaction: ONLINE_PUB.find(
      (a) => a.key === types.transaction
    )?.value,
    online_bar_pay365_fee: ONLINE_PUB.find(
      (a) => a.key === types.pay365_fee
    )?.value,
    online_bar_franchisor_result: ONLINE_PUB.find(
      (a) => a.key === types.franchisor_result
    )?.value,
    online_bar_credit_result: ONLINE_PUB.find(
      (a) => a.key === types.credit_result
    )?.value,
    online_bar_credit_spread: ONLINE_PUB.find(
      (a) => a.key === types.credid_spread
    )?.value,

    physical_consumer_bar_pay365_fee: PHYSICAL_PUB_CONSUMER.find(
      (a) => a.key === types.pay365_fee
    )?.value,
    physical_consumer_bar_credit_result: PHYSICAL_PUB_CONSUMER.find(
      (a) => a.key === types.credit_result
    )?.value,
    physical_consumer_bar_credit_spread: PHYSICAL_PUB_CONSUMER.find(
      (a) => a.key === types.credid_spread
    )?.value,

    physical_producer_bar_pay365_fee: PHYSICAL_PUB_PRODUCER.find(
      (a) => a.key === types.pay365_fee
    )?.value,
    physical_producer_bar_credit_result: PHYSICAL_PUB_PRODUCER.find(
      (a) => a.key === types.credit_result
    )?.value,
    physical_producer_bar_credit_spread: PHYSICAL_PUB_PRODUCER.find(
      (a) => a.key === types.credid_spread
    )?.value,

    direct_transaction_pay365_fee: DIRECT_TRANSACTION.find(
      (a) => a.key === types.pay365_fee
    )?.value,
    direct_transaction_credit_result: DIRECT_TRANSACTION.find(
      (a) => a.key === types.credit_result
    )?.value,
    direct_transaction_credit_spread: DIRECT_TRANSACTION.find(
      (a) => a.key === types.credid_spread
    )?.value,
  };
}


export function useGetAgreements() {
  const { headers } = useFranchisorAuth();
  const { data, error, isLoading } = useQuery<
    ResponseI<AgreementsI> | null | undefined
  >(["agreement"], async () => {
    const response = await apiFranquia.get(`agreement`, {
      headers: { ...headers },
      params: { page: 0, size: 50 },
    });
    return response.data;
  });

  return {
    AgreementsData: data,
    AgreementsError: error,
    isAgreementsLoading: isLoading,
    parsedData: parseAgreement(data?.items)
  };
}
