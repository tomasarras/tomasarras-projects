import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import VisitorViewer from '../../../components/VisitorViewer';

export default function Viewer({ data }) {

  return data.visits.map((visitor, i) => <VisitorViewer key={i} visitor={visitor}/>)
}

export async function getServerSideProps(context) {
  const { visitorId } = context.query;
  const response = await fetch(`https://api.fpjs.io/visitors/${visitorId}`, { headers: { "Auth-API-Key": process.env.FINGERPRINTJS_SECRET_KEY }});
  const data = await response.json();
  return { props: { data } }
}