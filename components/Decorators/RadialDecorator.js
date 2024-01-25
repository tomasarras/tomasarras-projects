import React, { useEffect, useState } from 'react';
import styles from "./RadialDecorator.module.css"

export default function RadialDecorator({ top, left }) {

  return (
    <div style={{top,left}} className={`${styles["radial"]}`}></div>
  );
}
