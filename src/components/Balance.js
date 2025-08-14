import React, { useContext, useEffect, useRef, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';

//Money formatter function
function moneyFormatter(num) {
  let p = num.toFixed(2).split('.');
  return (
    '₹ ' +
    p[0]
      .split('')
      .reverse()
      .reduce(function (acc, num, i, orig) {
        return num === '-' ? acc : num + (i && !(i % 3) ? ',' : '') + acc;
      }, '') +
    '.' +
    p[1]
  );
}

export const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0);

  const [displayValue, setDisplayValue] = useState(0);
  const previousValueRef = useRef(0);

  useEffect(() => {
    const start = previousValueRef.current;
    const end = total;
    const durationMs = 600;
    const startTime = performance.now();

    const raf = () => {
      const now = performance.now();
      const progress = Math.min(1, (now - startTime) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * eased;
      setDisplayValue(current);
      if (progress < 1) requestAnimationFrame(raf);
      else previousValueRef.current = end;
    };

    requestAnimationFrame(raf);
  }, [total]);

  return (
    <>
      <center><h4>Your Balance</h4></center>
      <h1><center>{moneyFormatter(displayValue)}</center></h1>
    </>
  )
}
