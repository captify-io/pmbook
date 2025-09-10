import { ReactNode } from "react";
import { ClientCaptifyLayout } from "./components/ClientCaptifyLayout";

interface CaptifyLayoutProps {
  children: React.ReactNode;
  params: Promise<{ captify: string }>;
}

export default async function CaptifyPageLayout({
  children,
  params,
}: CaptifyLayoutProps) {
  const { captify } = await params;

  console.log("called [captify]/layout.tsx with package:", captify);

  return (
    <ClientCaptifyLayout packageName={captify || ""}>
      {children}
    </ClientCaptifyLayout>
  );
}