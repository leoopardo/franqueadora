import { ProFormInstance, ProFormItem } from "@ant-design/pro-components";
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

  const getAddressFromLatLng = async (lat: number, lng: number) => {
    try {
      const results = await getGeocode({ location: { lat, lng } });
      if (results[0]) {
        setAddress(results[0].formatted_address);
        setValue(results[0].formatted_address, false);
        formRef?.setFieldValue("location", results[0].formatted_address);
      }
    } catch (error) {
      console.error("Error getting address: ", error);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      setIsGoogleMapsReady(true);
      initPlacesAutocomplete(); // Initialize usePlacesAutocomplete after Google Maps script is loaded
      if (!formRef?.getFieldValue("location") && !revealLatter && position) {
        getAddressFromLatLng(position?.lat, position?.lng);
      } else {
        setValue(formRef?.getFieldValue("location"));
        setAddress(formRef?.getFieldValue("location"));
      }
    }
  }, [isLoaded]);

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

      <Row style={{ width: "100%" }}>
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
              value={address}
              placeholder="Pesquise um local ou endereço."
              onChange={(value) => {
                setAddress(value);
                setValue(value);
                formRef?.setFieldValue("location", value);
              }}
              onSelect={async (value) => {
                const result = await getGeocode({ address: value });
                const { lat, lng } = await getLatLng(result[0]);
                setPosition({ lat, lng });
              }}
              options={data.map((suggestion) => ({
                label: suggestion.description,
                value: suggestion.description,
              }))}
              disabled={!isGoogleMapsReady || !ready || revealLatter}
            />
          </ProFormItem>
        </Col>
        <Col span={24}>
          {!isGoogleMapsReady ? (
            <h3>Loading…</h3>
          ) : (
            <GoogleMap
              mapContainerClassName="map_container"
              center={position ?? {
                lat: -24.95232,
                lng: -53.47538,
              }}
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
