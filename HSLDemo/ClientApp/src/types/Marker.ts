﻿import { LatLngExpression } from 'leaflet';
import { MarkerProps } from './MarkerProps'
export class Marker implements MarkerProps {
    position?: LatLngExpression;
    label?: string;
    layer?: string;
    show?: boolean;

    constructor(position: LatLngExpression, label: string, layer: string, show: boolean) {
        this.position = position;
        this.label = label;
        this.layer = layer;
        this.show = show;
    }
}
