import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Plant } from '@/types';
import { getCategoryColor } from '@/data/plants';

interface MapViewProps {
  plants: Plant[];
  onPlantClick?: (plant: Plant) => void;
  fullScreen?: boolean;
  selectedPlant?: Plant | null;
}

const MapView: React.FC<MapViewProps> = ({ plants, onPlantClick, fullScreen = false, selectedPlant }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map centered on India
    mapInstanceRef.current = L.map(mapRef.current).setView([22.5937, 78.9629], 5);

    // Add tile layer with a beautiful style
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19,
    }).addTo(mapInstanceRef.current);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add markers for each plant
    plants.forEach((plant) => {
      const color = getCategoryColor(plant.category);
      
      // Create custom icon
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            width: 36px;
            height: 36px;
            background-color: ${color};
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.2s;
          ">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <path d="M12 2a9 9 0 0 0-9 9c0 3.074 1.676 5.584 3.5 7.5 1.824 1.916 3.5 3.5 5.5 5.5 2-2 3.676-3.584 5.5-5.5 1.824-1.916 3.5-4.426 3.5-7.5a9 9 0 0 0-9-9z"/>
            </svg>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36],
      });

      const marker = L.marker([plant.location.lat, plant.location.lng], { icon })
        .addTo(mapInstanceRef.current!);

      // Create popup content
      const popupContent = `
        <div style="min-width: 200px; padding: 8px;">
          <img src="${plant.imageUrl}" alt="${plant.name}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />
          <h3 style="font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 600; margin-bottom: 4px; color: #2d2d2d;">${plant.name}</h3>
          <p style="font-size: 12px; color: #666; font-style: italic; margin-bottom: 6px;">${plant.botanicalName}</p>
          <span style="display: inline-block; padding: 2px 8px; background-color: ${color}; color: white; border-radius: 12px; font-size: 11px; font-weight: 500;">${plant.category}</span>
          <p style="font-size: 13px; color: #444; margin-top: 8px; line-height: 1.4;">${plant.medicinalUse.substring(0, 80)}...</p>
        </div>
      `;

      marker.bindPopup(popupContent, {
        closeButton: true,
        className: 'custom-popup',
      });

      marker.on('click', () => {
        if (onPlantClick) {
          onPlantClick(plant);
        }
      });

      markersRef.current.push(marker);
    });
  }, [plants, onPlantClick]);

  // Center on selected plant
  useEffect(() => {
    if (selectedPlant && mapInstanceRef.current) {
      mapInstanceRef.current.setView([selectedPlant.location.lat, selectedPlant.location.lng], 8, {
        animate: true,
        duration: 1,
      });
    }
  }, [selectedPlant]);

  return (
    <div
      ref={mapRef}
      className={`w-full ${fullScreen ? 'h-screen' : 'h-[400px]'} rounded-xl overflow-hidden`}
      style={{ zIndex: 0 }}
    />
  );
};

export default MapView;
