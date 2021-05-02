import { LatLngBoundsExpression } from 'leaflet';
import { IMarker } from './IMarker'
export class Marker implements IMarker {
    position?: LatLngBoundsExpression;
    address?: string;
    show?: boolean;

    constructor(position: LatLngBoundsExpression, address: string, show: boolean) {
        this.position = position;
        this.address = address;
        this.show = show;
    }
}
