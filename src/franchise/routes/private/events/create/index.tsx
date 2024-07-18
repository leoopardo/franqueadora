import { MutateFranchise } from "../components/mutate";

export const CreateEvent = () => {
  return (
    <div>
      <MutateFranchise
        title="Cadastro de evento"
        subtitle="Preencha todos os campos para adicionar um novo evento"
        mutate={() => {}}
      />
    </div>
  );
};
