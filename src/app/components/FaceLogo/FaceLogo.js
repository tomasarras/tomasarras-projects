import Image from 'next/image';
import logo from "../../../../public/logo.svg"


export default function FaceLogo() {

  return (<>
    <Image
      src={logo}
      priority
      className="invert-color"
      alt="Logo"
    />
  </>)
}