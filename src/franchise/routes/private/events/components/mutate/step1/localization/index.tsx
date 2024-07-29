import {
  ProFormField,
  ProFormInstance,
  ProFormItem,
} from "@ant-design/pro-components";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import defaultTheme from "@styles/default";
import { AutoComplete, Card, Col, Divider, Row, Switch } from "antd";
import { useEffect, useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const libraries: any = ["places"];

interface LocalizationI {
  formRef?: ProFormInstance;
  hidden?: boolean;
}

export const Localization = ({ formRef, hidden }: LocalizationI) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: `${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`,
    libraries,
  });

  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [address, setAddress] = useState("");
  const [isGoogleMapsReady, setIsGoogleMapsReady] = useState(false);
  const [revealLatter, setRevealLatter] = useState(false);

  const {
    ready,
    setValue,
    suggestions: { data },
    init: initPlacesAutocomplete,
  } = usePlacesAutocomplete({ debounce: 300 });

  function formatAddress(parts: string[]) {
    const addressKeys =
      parts.length === 7
        ? [
            "number",
            "address",
            "neighborhood",
            "city",
            "state",
            "country",
            "zipcode",
          ]
        : ["plus_code", "city_", "city", "state", "country"];
    const address: any = {};

    for (let i = 0; i < parts.length; i++) {
      address[addressKeys[addressKeys.length - parts.length + i]] =
        parts[i].trim();
    }

    return address;
  }

  const getAddressFromLatLng = async (lat: number, lng: number) => {
    try {
      const results = await getGeocode({ location: { lat, lng } });
      if (results[0]) {
        setAddress(results[0].formatted_address);
        setValue(results[0].formatted_address, false);
        formRef?.setFieldValue("location", results[0].formatted_address);
        const addressObj = formatAddress(
          results[0].address_components.map((a: any) => a.long_name)
        );
        formRef?.setFieldValue("address", addressObj.street || "");
        formRef?.setFieldValue("city", addressObj.city || "");
        formRef?.setFieldValue("state", addressObj.state || "");
        formRef?.setFieldValue("zipcode", addressObj.zipcode || "");
        formRef?.setFieldValue("neighborhood", addressObj.neighborhood || "");
        formRef?.setFieldValue("number", addressObj.number || "");
      }
    } catch (error) {
      console.error("Error getting address: ", error);
    }
  };

  const getLatLngFromAddress = async (address: string) => {
    try {
      const results = await getGeocode({ address });
      if (results[0]) {
        const { lat, lng } = await getLatLng(results[0]);
        setPosition({ lat, lng });
      }
    } catch (error) {
      console.error("Error getting coordinates: ", error);
    }
  };

  const handleFieldChange = async (fieldName: string, value: string) => {
    formRef?.setFieldValue(fieldName, value);
    const updatedFields = formRef?.getFieldsValue();
    const addressParts = [
      updatedFields.number,
      updatedFields.street,
      updatedFields.neighborhood,
      updatedFields.city,
      updatedFields.state,
      updatedFields.country,
      updatedFields.zipcode,
    ].filter(Boolean);

    const newAddress = addressParts.join(", ");
    setAddress(newAddress);
    setValue(newAddress);
    formRef?.setFieldValue("location", newAddress);
  };

  useEffect(() => {
    if (isLoaded) {
      setIsGoogleMapsReady(true);
      initPlacesAutocomplete();
    }
  }, [isLoaded]);

  useEffect(() => {
    // Inicializar posição e endereço do formRef
    const initialLocation = formRef?.getFieldValue("location");

    if (initialLocation) {
      setAddress(initialLocation);
      setValue(initialLocation);
    } else if (!revealLatter && position) {
      getAddressFromLatLng(position.lat, position.lng);
    }
  }, [formRef?.getFieldValue("location"), position]);

  useEffect(() => {
    if (address) {
      getLatLngFromAddress(address);
    }
  }, [address]);

  if (loadError) {
    return <div>Erro ao carregar o mapa</div>;
  }

  return (
    <Card style={{ width: "100%", display: hidden ? "none" : undefined }}>
      <Divider orientation="left" style={{ marginTop: 0 }}>
        <MapPinIcon
          height={20}
          style={{ marginRight: 8, marginBottom: -4 }}
          color={defaultTheme.primary}
        />
        Local do evento
      </Divider>

      <Row style={{ width: "100%" }} gutter={[8, 8]}>
        <Col span={24}>
          <ProFormItem
            name="reveal_address_latter"
            label="Revelar local em breve."
          >
            <Switch
              onChange={(active) => {
                if (active) {
                  formRef?.setFieldValue("location", null);
                  setValue("");
                  setAddress("");
                }
                setRevealLatter(active);
              }}
            />
          </ProFormItem>
        </Col>
        <Col span={24}>
          <ProFormItem
            name="location"
            label="Endereço."
            rules={[{ required: !revealLatter }]}
          >
            <AutoComplete
              placeholder="Pesquise um local ou endereço."
              onChange={(value) => {
                setAddress(value);
                setValue(value);
                formRef?.setFieldValue("location", value);
              }}
              onSelect={async (value) => {
                const results = await getGeocode({ address: value });
                if (results[0]) {
                  const { lat, lng } = await getLatLng(results[0]);
                  setPosition({ lat, lng });
                  const addressObj = formatAddress(
                    results[0].address_components.map((a: any) => a.long_name)
                  );
                  formRef?.setFieldValue("address", addressObj.address || "");
                  formRef?.setFieldValue("city", addressObj.city || "");
                  formRef?.setFieldValue("state", addressObj.state || "");
                  formRef?.setFieldValue("zipcode", addressObj.zipcode || "");
                  formRef?.setFieldValue(
                    "neighborhood",
                    addressObj.neighborhood || ""
                  );
                  formRef?.setFieldValue("number", addressObj.number || "");
                }
              }}
              options={data.map((suggestion) => ({
                label: suggestion.description,
                value: suggestion.description,
              }))}
              disabled={!isGoogleMapsReady || !ready || revealLatter}
            />
          </ProFormItem>
        </Col>
        <Col span={12}>
          <ProFormField
            name="address"
            label="Rua"
            fieldProps={{
              onChange: (e: any) =>
                handleFieldChange("address", e.target.value),
            }}
          />
        </Col>
        <Col span={12}>
          <ProFormField
            name="number"
            label="Número"
            fieldProps={{
              onChange: (e: any) => handleFieldChange("number", e.target.value),
            }}
          />
        </Col>
        <Col span={12}>
          <ProFormField
            name="neighborhood"
            label="Bairro"
            fieldProps={{
              onChange: (e: any) =>
                handleFieldChange("neighborhood", e.target.value),
            }}
          />
        </Col>
        <Col span={12}>
          <ProFormField
            name="city"
            label="Cidade"
            fieldProps={{
              onChange: (e: any) => handleFieldChange("city", e.target.value),
            }}
          />
        </Col>
        <Col span={12}>
          <ProFormField
            name="state"
            label="Estado"
            fieldProps={{
              onChange: (e: any) => handleFieldChange("state", e.target.value),
            }}
          />
        </Col>
        <Col span={12}>
          <ProFormField
            name="zipcode"
            label="CEP"
            fieldProps={{
              onChange: (e: any) =>
                handleFieldChange("zipcode", e.target.value),
            }}
          />
        </Col>
        <Col span={24}>
          {!isGoogleMapsReady ? (
            <h3>Loading…</h3>
          ) : (
            <GoogleMap
              mapContainerClassName="map_container"
              center={
                position ?? {
                  lat: -24.95232,
                  lng: -53.47538,
                }
              }
              zoom={15}
              mapContainerStyle={{
                width: "100%",
                height: 400,
                borderRadius: 12,
                border: "1px solid rgb(113, 113, 122, 0.3)",
              }}
              onClick={(e) => {
                const newLat = e?.latLng?.lat();
                const newLng = e?.latLng?.lng();
                if (newLat && newLng) {
                  setPosition({ lat: newLat, lng: newLng });
                  getAddressFromLatLng(newLat, newLng);
                }
              }}
            >
              {!revealLatter && position && (
                <MarkerF
                  position={position}
                  clickable
                  draggable
                  onDragEnd={(e) => {
                    const newLat = e?.latLng?.lat();
                    const newLng = e?.latLng?.lng();
                    if (newLat && newLng) {
                      setPosition({ lat: newLat, lng: newLng });
                      getAddressFromLatLng(newLat, newLng);
                    }
                  }}
                />
              )}
            </GoogleMap>
          )}
        </Col>
      </Row>
    </Card>
  );
};
