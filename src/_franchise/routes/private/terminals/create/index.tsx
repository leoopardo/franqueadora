import { Services } from "../../../../services";
import { MutateTerminal } from "../components/mutateTerminal";

export const CreateTerminals = () => {
  const { mutate } = Services.terminal.create();
  return (
    <div>
      <MutateTerminal
        title="Cadastro de terminal"
        subtitle="Preencha todos os campos para adicionar um novo terminal"
        mutate={(data) =>
          mutate({
            ...data,
            promoter_license_id: '',
            license_expiration_date: '',
          })
        }
      />
    </div>
  );
};
