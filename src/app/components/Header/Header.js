import { HeaderProvider } from '@/app/Context/HeaderContext';
import HeaderClientRender from './HeaderClientRender';
import HeaderServerRender from './HeaderServerRender';

export default function Header() {

  return (
    <HeaderProvider>
      <HeaderClientRender>
        <HeaderServerRender/>
      </HeaderClientRender>
    </HeaderProvider>
  )
}