// import { ProForm, StepsForm } from "@ant-design/pro-components";
// import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/outline";
// import { Button, Col, Divider, Input, Row } from "antd";
// import { useEffect, useRef, useState } from "react";
// import { CurrencyInput } from "react-currency-mask";
// import { useBreakpoints } from "../../../../../hooks/useBreakpoints";

// interface moduleType {
//   name: string;
//   label: string;
//   antifraud: boolean;
//   transaction: boolean;
//   pay365fee: boolean;
//   franchisor_result: boolean;
//   credit_result: boolean;
//   credit_spread: boolean;
//   emission_fee: boolean;
// }
// export const StepThree = () => {
//   const stepOneRef = useRef<any>(null);
//   const { isXs } = useBreakpoints();
//   const [updateFees, setUpdateFees] = useState<boolean>(false);

//   const waitTime = (time: number = 100) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(true);
//       }, time);
//     });
//   };

//   const modules: moduleType[] = [
//     {
//       name: "ticket",
//       label: "Ingresso online",
//       antifraud: true,
//       transaction: true,
//       pay365fee: true,
//       franchisor_result: true,
//       credit_result: true,
//       credit_spread: true,
//       emission_fee: false,
//     },
//     {
//       name: "bar",
//       label: "Bar online",
//       antifraud: true,
//       transaction: true,
//       pay365fee: true,
//       franchisor_result: true,
//       credit_result: true,
//       credit_spread: true,
//       emission_fee: false,
//     },
//     {
//       name: "consumer_ticket",
//       label: "Ingresso físico (Consumidor)",
//       antifraud: false,
//       transaction: false,
//       emission_fee: true,
//       pay365fee: true,
//       franchisor_result: true,
//       credit_result: true,
//       credit_spread: true,
//     },
//     {
//       name: "producer_ticket",
//       label: "Ingresso físico (Produtor)",
//       antifraud: false,
//       transaction: false,
//       emission_fee: true,
//       pay365fee: true,
//       franchisor_result: true,
//       credit_result: false,
//       credit_spread: true,
//     },
//     {
//       name: "consumer_bar",
//       label: "Bar físico (Consumidor)",
//       antifraud: false,
//       transaction: false,
//       emission_fee: false,
//       pay365fee: true,
//       credit_result: true,
//       credit_spread: true,
//       franchisor_result: false,
//     },
//     {
//       name: "producer_bar",
//       label: "Bar físico (Produtor)",
//       antifraud: false,
//       transaction: false,
//       pay365fee: true,
//       credit_result: true,
//       credit_spread: true,
//       franchisor_result: false,
//       emission_fee: false,
//     },
//     {
//       name: "direct_transaction",
//       label: "Transação direta",
//       antifraud: false,
//       transaction: false,
//       pay365fee: true,
//       credit_result: true,
//       credit_spread: true,
//       franchisor_result: false,
//       emission_fee: false,
//     },
//   ];

//   const initialValues = {
//     ticket_antifraude: 0,
//     ticket_transaction: 0.2,
//     ticket_pay365_fee: 0.25,
//     ticket_franchisor_result: 60,
//     ticket_credit_result: 60,
//     ticket_credit_spread: 1.0,
//     bar_antifraude: 0,
//     bar_transaction: 0.2,
//     bar_pay365_fee: 0.25,
//     bar_franchisor_result: 60,
//     bar_credit_result: 60,
//     bar_credit_spread: 1.0,
//     consumer_ticket_emission: 0.3,
//     consumer_ticket_pay365_fee: 0.25,
//     consumer_ticket_franchisor_result: 60,
//     consumer_ticket_credit_result: 60,
//     consumer_ticket_credit_spread: 1.0,
//     producer_ticket_emission: 0.3,
//     producer_ticket_pay365_fee: 0.25,
//     producer_ticket_franchisor_result: 60,
//     producer_ticket_credit_spread: 1.0,
//     consumer_bar_pay365_fee: 0.25,
//     consumer_bar_credit_result: 60,
//     consumer_bar_credit_spread: 1.0,
//     producer_bar_pay365_fee: 0.25,
//     producer_bar_credit_result: 60,
//     producer_bar_credit_spread: 1.0,
//     direct_transaction_pay365_fee: 0.25,
//     direct_transaction_credit_result: 60,
//     direct_transaction_credit_spread: 1.0,
//   };

//   useEffect(() => {
//     stepOneRef.current.setFieldsValue(initialValues);
//   }, []);

//   return (
//     <StepsForm.StepForm<{
//       antifraude: number;
//       transaction: number;
//       pay365_fee: number;
//       franchisor_result: number;
//       credit_result: number;
//       credit_spread: number;
//     }>
//       name="base"
//       title="Acordo comercial"
//       onFinish={async () => {
//         await waitTime(2000);
//         return true;
//       }}
//       size="large"
//       grid
//       formRef={stepOneRef}
//     >
//       <Row
//         style={{ width: isXs ? "70%" : "100%" }}
//         gutter={[8, 8]}
//         align="middle"
//       >
//         <Col
//           span={24}
//           style={{
//             display: "flex",
//             gap: 8,
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <Button
//             size="large"
//             icon={
//               updateFees ? (
//                 <LockOpenIcon style={{ width: 26 }} />
//               ) : (
//                 <LockClosedIcon style={{ width: 26 }} />
//               )
//             }
//             shape="circle"
//             style={{ width: 50, height: 50 }}
//             onClick={() => setUpdateFees((prev) => !prev)}
//           />
//         </Col>
//         {modules.map((module) => (
//           <>
//             <Col md={{ span: 24 }} xs={{ span: 24 }}>
//               <Divider orientation="left">{module.label}</Divider>
//             </Col>
//             {module.antifraud && (
//               <Col md={{ span: 12 }} xs={{ span: 24 }}>
//                 <ProForm.Item
//                   name={`${module.name}_antifraude`}
//                   label="Antifraude"
//                   rules={[
//                     {
//                       required: true,
//                     },
//                   ]}
//                 >
//                   <CurrencyInput
//                     onChangeValue={(_event) => {
//                       return;
//                     }}
//                     InputElement={
//                       <Input
//                         size="large"
//                         style={{ width: "100%" }}
//                         disabled={!updateFees}
//                         placeholder="R$ 0,00"
//                       />
//                     }
//                   />
//                 </ProForm.Item>
//               </Col>
//             )}
//             {module.transaction && (
//               <Col md={{ span: 12 }} xs={{ span: 24 }}>
//                 <ProForm.Item
//                   name={`${module.name}_transaction`}
//                   label="Transação"
//                   rules={[
//                     {
//                       required: true,
//                     },
//                   ]}
//                 >
//                   <CurrencyInput
//                     onChangeValue={(_event) => {
//                       return;
//                     }}
//                     InputElement={
//                       <Input
//                         size="large"
//                         style={{ width: "100%" }}
//                         disabled={!updateFees}
//                         placeholder="R$ 0,00"
//                       />
//                     }
//                   />
//                 </ProForm.Item>
//               </Col>
//             )}
//             {module.emission_fee && (
//               <Col md={{ span: 12 }} xs={{ span: 24 }}>
//                 <ProForm.Item
//                   name={`${module.name}_emission`}
//                   label="Taxa de emissão"
//                   rules={[
//                     {
//                       required: true,
//                     },
//                   ]}
//                 >
//                   <CurrencyInput
//                     onChangeValue={(_event) => {
//                       return;
//                     }}
//                     InputElement={
//                       <Input
//                         size="large"
//                         style={{ width: "100%" }}
//                         disabled={!updateFees}
//                         placeholder="R$ 0,00"
//                       />
//                     }
//                   />
//                 </ProForm.Item>
//               </Col>
//             )}
//             {module.pay365fee && (
//               <Col md={{ span: 12 }} xs={{ span: 24 }}>
//                 <ProForm.Item
//                   name={`${module.name}_pay365_fee`}
//                   label="Taxa PAY365"
//                   rules={[
//                     {
//                       required: true,
//                     },
//                   ]}
//                 >
//                   <CurrencyInput
//                     onChangeValue={(_event) => {
//                       return;
//                     }}
//                     hideSymbol
//                     max={100}
//                     InputElement={
//                       <Input
//                         size="large"
//                         style={{ width: "100%" }}
//                         disabled={!updateFees}
//                         placeholder="Digite a taxa da PAY356"
//                         addonAfter="%"
//                       />
//                     }
//                   />
//                 </ProForm.Item>
//               </Col>
//             )}
//             {module.franchisor_result && (
//               <Col md={{ span: 12 }} xs={{ span: 24 }}>
//                 <ProForm.Item
//                   name={`${module.name}_franchisor_result`}
//                   label="Resultado franqueadora"
//                   rules={[
//                     {
//                       required: true,
//                     },
//                   ]}
//                 >
//                   <CurrencyInput
//                     onChangeValue={(_event) => {
//                       return;
//                     }}
//                     hideSymbol
//                     max={100}
//                     InputElement={
//                       <Input
//                         size="large"
//                         style={{ width: "100%" }}
//                         disabled={!updateFees}
//                         placeholder="Digite o resultado da franqueadora"
//                         addonAfter="%"
//                       />
//                     }
//                   />
//                 </ProForm.Item>
//               </Col>
//             )}
//             {module.credit_result && (
//               <Col md={{ span: 12 }} xs={{ span: 24 }}>
//                 <ProForm.Item
//                   name={`${module.name}_credit_result`}
//                   label="Resultado antecipação de crédito"
//                   rules={[
//                     {
//                       required: true,
//                     },
//                   ]}
//                 >
//                   <CurrencyInput
//                     onChangeValue={(_event) => {
//                       return;
//                     }}
//                     hideSymbol
//                     max={100}
//                     InputElement={
//                       <Input
//                         size="large"
//                         style={{ width: "100%" }}
//                         disabled={!updateFees}
//                         placeholder="Digite o resultado da antecipação de crédito"
//                         addonAfter="%"
//                       />
//                     }
//                   />
//                 </ProForm.Item>
//               </Col>
//             )}
//             {module.credit_spread && (
//               <Col md={{ span: 12 }} xs={{ span: 24 }}>
//                 <ProForm.Item
//                   name={`${module.name}_credit_spread`}
//                   label="Spread antecipação de crédito"
//                   rules={[
//                     {
//                       required: true,
//                     },
//                   ]}
//                 >
//                   <CurrencyInput
//                     onChangeValue={(_event) => {
//                       return;
//                     }}
//                     hideSymbol
//                     max={100}
//                     InputElement={
//                       <Input
//                         size="large"
//                         style={{ width: "100%" }}
//                         disabled={!updateFees}
//                         placeholder="Digite o spread da antecipação de crédito"
//                         addonAfter="%"
//                       />
//                     }
//                   />
//                 </ProForm.Item>
//               </Col>
//             )}
//           </>
//         ))}
//       </Row>
//     </StepsForm.StepForm>
//   );
// };
