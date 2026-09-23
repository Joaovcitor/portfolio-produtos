import { ShieldCheck } from 'lucide-react';
import { AtlasApp } from './components/product-demos/atlas/AtlasApp';
import { DomusApp } from './components/product-demos/domus/DomusApp';
import { VemKaApp } from './components/product-demos/vemka/VemKaApp';
import { OrdianApp } from './components/product-demos/ordian/OrdianApp';

export type ProductId = 'atlas' | 'domus' | 'vemka' | 'ordian';
const names = { atlas: 'Atlas', domus: 'Domus', vemka: 'VemKa', ordian: 'Ordian' };

export function Mockup({ id, view = 0, interactive = false }: { id: ProductId; view?: number; interactive?: boolean }) {
  return (
    <div className={`mockup mock-${id}`} data-mock={id}>
      <div className="windowbar">
        <span className="window-dots"><i /><i /><i /></span>
        <span>{names[id]} · Ambiente demonstrativo</span>
        <ShieldCheck size={12} />
      </div>

      <div className="faithful-replica-container" style={{ position: 'relative', overflowY: 'hidden', maxHeight: '460px', background: '#fff' }}>
        {id === 'atlas' && <AtlasApp view={view} />}
        {id === 'domus' && <DomusApp view={view} />}
        {id === 'vemka' && <VemKaApp view={view} />}
        {id === 'ordian' && <OrdianApp view={view} />}
      </div>

      <div className="mock-bottom">
        Dados fictícios · Representação de interface reproduzindo a identidade visual oficial do produto.
      </div>
    </div>
  );
}
