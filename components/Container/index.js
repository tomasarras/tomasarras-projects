import React, { useEffect, useState } from 'react';

export default function Container({ children }) {

  return (
  <section className='container py-4 h-100'>
    <div style={{ padding: "60px 0"}} className='h-100'>
      {children}
    </div>
  </section>)
}