import { LatLngExpression } from 'leaflet';
export class SearchResult {
    label: string;
    position: LatLngExpression;
    isSelected: boolean;

    constructor(label: string, position: LatLngExpression, isSelected: boolean) {
        this.label = label;
        this.position = position;
        this.isSelected = isSelected;
    }
}
