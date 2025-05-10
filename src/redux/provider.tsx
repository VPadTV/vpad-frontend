'use client'

import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { ReactNode, useEffect, useState } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'react-hot-toast';
import { Spinner } from "@nextui-org/react";

function ClientOnly({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? <>{children}</> : null;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ClientOnly>
        <PersistGate 
          loading={
            <div className="h-screen w-full flex items-center justify-center">
              <Spinner size="lg" color="primary" />
            </div>
          } 
          persistor={persistor!}
        >
          <Toaster position="top-center" reverseOrder={false} />
          {children}
        </PersistGate>
      </ClientOnly>
    </Provider>
  );
}
