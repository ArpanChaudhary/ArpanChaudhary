import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/ArpanChaudhary/', // Set this to your repo name if different
}); 