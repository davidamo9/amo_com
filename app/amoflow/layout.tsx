import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AMOflow',
};

export default function AmoflowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="amoflow-layout">
      {children}
    </div>
  );
}
