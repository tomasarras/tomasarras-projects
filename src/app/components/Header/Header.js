import HeaderClientRender from './HeaderClientRender';
import HeaderServerRender from './HeaderServerRender';

export default function Header() {

  return (
    <HeaderClientRender>
      <HeaderServerRender/>
    </HeaderClientRender>
  )
}