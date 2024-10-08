import { ProFormInstance, StepsForm } from "@ant-design/pro-components";
import { useRef } from "react";

export const StepTwo = () => {
  const stepOneRef = useRef<ProFormInstance>();
  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  return (
    <StepsForm.StepForm
      name="base"
      title="Ingressos"
      onFinish={async () => {
        await waitTime(500);
        return true;
      }}
      size="large"
      grid
      formRef={stepOneRef}
      onFinishFailed={() => {
        const fields = stepOneRef?.current?.getFieldsError();
        const firstErrorField = fields?.find(
          (field: any) => field.errors.length > 0
        );
        if (firstErrorField) {
          stepOneRef?.current?.scrollToField(firstErrorField.name[0], {
            behavior: "smooth",
            block: "center",
          });
        }
      }}
    ></StepsForm.StepForm>
  );
};
