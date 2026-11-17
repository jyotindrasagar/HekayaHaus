import { CLIENTS } from '../../data/site';

export function BrandMarquee({ title = 'Chosen by leaders' }: { title?: string }) {
  const row = (hidden: boolean) => (
    <ul className="marquee-row" aria-hidden={hidden || undefined}>
      {CLIENTS.map((c) => (
        <li key={c.name}>
          <img src={c.logo} alt={hidden ? '' : c.name} width={c.w} height={c.h} loading="lazy" decoding="async" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee-wrap container">
      <p className="marquee-title">{title}</p>
      <div className="marquee" aria-label={`Clients: ${CLIENTS.map((c) => c.name).join(', ')}`}>
        <div className="marquee-track">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </div>
  );
}
