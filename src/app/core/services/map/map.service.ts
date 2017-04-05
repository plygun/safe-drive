import {Injectable} from '@angular/core';

import {ObstacleService} from '../obstacle/obstacle.service';
import {Obstacle} from '../../../classes/obstacle.interface';
import ProjectionLike = ol.proj.ProjectionLike;


@Injectable()
export class MapService {
    private _map: ol.Map;
    private geolocation: ol.Geolocation;
    private currentCoordinate: ol.Coordinate;
    private _clickedCoordinate: ol.Coordinate;
    private vectorLayer: ol.layer.Vector;
    private items: Array<Obstacle>;

    constructor(private obstacleService: ObstacleService){ }

    initMap(callbacks?: any): void {
        if(!this.geolocation) {

            this.geolocation = new ol.Geolocation({
                projection: ol.proj.get(<ProjectionLike>'px')
            });

            this.geolocation.on('change', () => {
                this.currentCoordinate = this.geolocation.getPosition();

                if(!this._map) {
                    this.createMap();

                    if(this.items){
                        this.addVectorLayer(this.items);
                    }

                    if(callbacks && callbacks.click) {
                        callbacks.click(this.map);
                    }
                }
            });

            this.subscribeToObstacleItems();
            this.geolocation.setTracking(true);
        }
    }

    destroyMap(): void {
        this.geolocation = null;
        this._map.setTarget(null);
        this._map = null;
    }

    private createMap(): void {
        this._map = new ol.Map({
            target: 'map',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat(this.currentCoordinate),
                zoom: 16
            }),
            controls: ol.control.defaults({attribution: false}).extend([
                new ol.control.FullScreen(),
                new ol.control.ZoomSlider(),
                new ol.control.ScaleLine()
            ])
        });
    }

    private addVectorLayer(items: Array<Obstacle>): void {
        let vectorSource = new ol.source.Vector({}),
            iconStyle: ol.style.Style,
            vectorLayer: ol.layer.Vector;

        items.forEach(item => {
            let iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(item.coordinates),
                item: item
            });
            vectorSource.addFeature(iconFeature);
        });

        //create style for layer
        iconStyle = new ol.style.Style({
            image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
               /* anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',*/
                opacity: 0.75,
                src: '/assets/icons/map_marker.png'
            }))
        });

        //add the feature vector to the layer vector, apply a style to whole layer
        vectorLayer = new ol.layer.Vector({
            source: vectorSource,
            style: iconStyle
        });

        if(this.vectorLayer) {
            this.map.removeLayer(this.vectorLayer);
        }

        this.vectorLayer = vectorLayer;
        this.map.addLayer(vectorLayer);
    }

    private subscribeToObstacleItems(): void {
        this.obstacleService.items.subscribe(items => {
            this.items = items;
            if(this.map){
                this.addVectorLayer(items);
            }
        });
    }


    // Class member accessors
    get map(): ol.Map {
        return this._map;
    }

    get clickedCoordinate(): ol.Coordinate {
        return this._clickedCoordinate;
    }

    set clickedCoordinate(coordinate: ol.Coordinate) {
        this._clickedCoordinate = coordinate;
    }

}
