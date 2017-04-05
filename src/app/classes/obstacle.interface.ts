export interface Obstacle{
    $key?: string,
    name: string,
    description: string,
    coordinates: ol.Coordinate,
    images?: Array<string>
}