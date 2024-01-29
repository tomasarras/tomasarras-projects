import React, { useEffect, useRef } from 'react';
import styles from "./VisitorViewer.module.css";

export default function VisitorViewer({ visitor }) {
  const mapRef = useRef(null);
  const { browserDetails, ipLocation } = visitor;

  useEffect(() => {
    const coordinates = { lat: ipLocation.latitude, lng: ipLocation.longitude };
    const map = new window.google.maps.Map(mapRef.current, {
      center: coordinates,
      zoom: 15,
    });

    new google.maps.Marker({
      position: coordinates,
      map,
      title: visitor.requestId,
    });
  });


  return (
    <div className={styles.container}>
      <div ref={mapRef} className={styles.map} id="map" />
      <div>
        <h2>Details</h2>
        <ul>
          <li><span className={styles.bold}>IP: </span>{visitor.ip}</li>
          <li><span className={styles.bold}>Timestamp: </span>{visitor.timestamp}</li>
          <li><span className={styles.bold}>Device time: </span>{visitor.time}</li>
          <li><span className={styles.bold}>Time: </span>{new Date(visitor.timestamp).toString()}</li>
          <li><span className={styles.bold}>Modo incognito: </span>{visitor.incognito ? "Si" : "No"}</li>
        </ul>

        <h2>Browser details</h2>
        <ul>
          <li><span className={styles.bold}>Browser name: </span>{browserDetails.browserName}</li>
          <li><span className={styles.bold}>Browser version: </span>{browserDetails.browserMajorVersion}</li>
          <li><span className={styles.bold}>Browser full version: </span>{browserDetails.browserFullVersion}</li>
          <li><span className={styles.bold}>Operative system: </span>{browserDetails.os}</li>
          <li><span className={styles.bold}>Operative system version: </span>{browserDetails.osVersion}</li>
          <li><span className={styles.bold}>Device: </span>{browserDetails.device}</li>
          <li><span className={styles.bold}>User Agent: </span>{browserDetails.userAgent}</li>
        </ul>

        <h2>IP details</h2>
        <ul>
          <li><span className={styles.bold}>Accuracy radius: </span>{ipLocation.accuracyRadius}</li>
          <li><span className={styles.bold}>Latitude: </span>{ipLocation.latitude}</li>
          <li><span className={styles.bold}>Longitude: </span>{ipLocation.longitude}</li>
          <li><span className={styles.bold}>Postal code: </span>{ipLocation.postalCode}</li>
          <li><span className={styles.bold}>Timezone: </span>{ipLocation.timezone}</li>
          <li><span className={styles.bold}>City: </span>{ipLocation?.city.name}</li>
          <li><span className={styles.bold}>Country: </span>{ipLocation.country?.name}</li>
          <li><span className={styles.bold}>continent: </span>{ipLocation.continent?.name}</li>
          <li><span className={styles.bold}>Subdivisions: </span>{ipLocation.subdivisions?.name}</li>
        </ul>
      </div>
    </div>
  )
}