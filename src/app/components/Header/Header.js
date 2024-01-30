import HeaderClientRender from './HeaderClientRender';
import HeaderServerRender from './HeaderServerRender';

export default function Header({ sections }) {

  return (
    <HeaderClientRender>
      <HeaderServerRender/>
    </HeaderClientRender>
  )
}