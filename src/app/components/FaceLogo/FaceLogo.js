import Image from 'next/image';
import logo from "../../../../public/logo-white.svg"


export default function FaceLogo() {

  return (<>
    <Image
      src={logo}
      priority
      alt="Logo"
    />
  </>)
}