'use client';

export type BeforeDashboardProps = {};

export default function BeforeDashboard(props: BeforeDashboardProps) {
  return (
    <div>
      <p className="uppercase text-sm text-muted-foreground">
        Painel de Administração
      </p>
      <h1 className="text-3xl font-bold">
        INCT Antirracismo, Interseccionalidade e Justiça Social na América
        Latina
      </h1>
    </div>
  );
}
