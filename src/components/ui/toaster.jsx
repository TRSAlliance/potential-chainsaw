/**
 * Toaster Component - Toast notification container
 * Integrates with the sonner toast library
 */
import { Toaster as SonnerToaster } from 'sonner'

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      theme="dark"
      richColors
      expand
      closeButton
      toastOptions={{
        classNames: {
          toast: 'bg-slate-800 text-white border border-slate-700',
          title: 'font-semibold',
          description: 'text-slate-300',
        },
      }}
    />
  )
}

export default Toaster
