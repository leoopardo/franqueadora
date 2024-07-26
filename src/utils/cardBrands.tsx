import { Avatar } from "antd";
import Amex from "/cards/amex.png";
import Bahrisul from "/cards/banrisul.png";
import Elo from "/cards/elo.png";
import Hipercard from "/cards/hipercard.png";
import Mastercard from "/cards/mastercard.png";
import Visa from "/cards/visa.png";

export const cardBrands = [
  {
    label: "American express",
    value: "amex",
    Icon: (
      <Avatar
        size="small"
        shape="square"
        src={Amex}
        style={{ width: "40px" }}
      />
    ),
  },
  {
    label: "Visa",
    value: "visa",
    Icon: (
      <Avatar
        size="small"
        shape="square"
        src={Visa}
        style={{ width: "40px" }}
      />
    ),
  },
  {
    label: "Elo",
    value: "elo",
    Icon: (
      <Avatar size="small" shape="square" src={Elo} style={{ width: "40px" }} />
    ),
  },
  {
    label: "Mastercard",
    value: "mastercard",
    Icon: (
      <Avatar
        size="small"
        shape="square"
        src={Mastercard}
        style={{ width: "40px" }}
      />
    ),
  },
  {
    label: "Hipercard",
    value: "hipercard",
    Icon: (
      <Avatar
        size="small"
        shape="square"
        src={Hipercard}
        style={{ width: "40px" }}
      />
    ),
  },
  {
    label: "Banrisul",
    value: "banrisul",
    Icon: (
      <Avatar
        size="small"
        shape="square"
        src={Bahrisul}
        style={{ width: "40px" }}
      />
    ),
  },
];
