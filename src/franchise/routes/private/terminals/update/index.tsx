import { Services } from "@franchise/services";
import { useParams } from "react-router-dom";
import { MutateTerminal } from "../components/mutateTerminal";

export const UpdateTerminals = () => {
  const { id } = useParams();
  const { byId, update } = Services.terminal;
  const terminal = byId(id || "");
  const { mutate, isLoading } = update(id || "");

  return (
    <div>
      <MutateTerminal
        title="Cadastro de terminal"
        subtitle="Preencha todos os campos para adicionar um novo terminal"
        mutate={(data) =>
          mutate({
            ...data,
            terminal_model_id: data.model_id,
            model_id: undefined,
          } as any)
        }
        initialValues={{
          franchise_id: terminal?.data?.franchise_id,
          promoter_id: terminal?.data?.promoter_id,
          client_id: terminal?.data?.client_id,
          model_id: terminal?.data?.terminal_model_id,
          time_zone_id: terminal?.data?.time_zone_id,
          modules: terminal?.data?.modules?.map((module) => module?.id),
          acquirers: terminal?.data?.acquirers?.map(
            (acquirer: any) => acquirer?.id
          ),
          situation: terminal?.data?.situation,
          serial_number: terminal?.data?.serial_number,
        }}
        update
        loading={terminal.isLoading || isLoading}
      />
    </div>
  );
};
