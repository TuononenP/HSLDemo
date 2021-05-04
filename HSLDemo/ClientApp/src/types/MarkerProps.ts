import { LatLngExpression } from 'leaflet';
export interface MarkerProps {
    position?: LatLngExpression;
    label?: string;
    layer?: string;
    show?: boolean;
    highlighted?: boolean;
}
