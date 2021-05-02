import { LatLngBoundsExpression } from 'leaflet';
export interface IMarker {
    position?: LatLngBoundsExpression;
    address?: string;
    show?: boolean;
}
