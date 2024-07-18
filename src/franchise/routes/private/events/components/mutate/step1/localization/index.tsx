import { MapPinIcon } from "@heroicons/react/24/outline";
import defaultTheme from "@styles/default";
import { AutoComplete, Card, Col, Divider, Row } from "antd";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import {
  ProFormField,
  ProFormItem,
  ProFormSwitch,
} from "@ant-design/pro-components";
import usePlacesAutocomplete from "use-places-autocomplete";

export const Localization = () => {
  const libraries: any = ["places"];
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`,
    libraries,
  });
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({});
  const center = { lat: -24.95232, lng: -53.47538 };

  const onLoadMarker = (marker: any) => {
    console.log("Marker", marker.position.lat);
  };

  console.log(data, status);

  return (
    <Card style={{ width: "100%" }}>
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
          <ProFormSwitch label="Revelar local em breve." />
        </Col>
        <Col span={24}>
          <ProFormItem name="address" label="Endereço.">
            <AutoComplete
              onChange={(value) => setValue(value)}
              options={data.map((data) => ({ label: data.description }))}
            />
          </ProFormItem>
        </Col>
        <Col span={24}>
          {!isLoaded ? (
            <h3>Loading…..</h3>
          ) : (
            <GoogleMap
              mapContainerClassName="map_container"
              center={center}
              zoom={15}
              mapContainerStyle={{ width: "100%", height: 400 }}
            >
              <MarkerF position={center} onLoad={onLoadMarker} />
            </GoogleMap>
          )}
        </Col>
      </Row>
    </Card>
  );
};
