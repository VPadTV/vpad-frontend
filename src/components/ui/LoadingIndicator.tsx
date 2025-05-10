import React from 'react';
import { Spinner } from "@nextui-org/react";

export default function LoadingIndicator() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Spinner size="lg" color="primary" />
    </div>
  );
}
