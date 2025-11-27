'use client';

import { useCurrencyStore } from '@/lib/currencyStore';
import { useState, useEffect } from 'react';

interface FormattedPriceProps {
  price: number;
  className?: string;
}

/**
 * Simple formatted price component that prevents hydration mismatches
 * by using suppressHydrationWarning and subscribes to currency changes.
 */
export default function FormattedPrice({ price, className = '' }: FormattedPriceProps) {
  // Subscribe to selectedCurrency and exchangeRates to trigger re-renders when currency changes
  // This ensures the component updates immediately when currency is changed
  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);
  const exchangeRates = useCurrencyStore((state) => state.exchangeRates);
  const formatPrice = useCurrencyStore((state) => state.formatPrice);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <span className={className} suppressHydrationWarning>
      {mounted ? formatPrice(price) : `$${price.toFixed(2)}`}
    </span>
  );
}

