"use client";

import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export function CopyCode({ code }: { code: string | undefined }) {
  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code).then(() => {
        toast.success("Código copiado correctamente.");
      });
    }
  };

  return (
    <Button onClick={handleCopy}>
      <Copy className="h-4 w-4" />
      {code}
    </Button>
  );
}
