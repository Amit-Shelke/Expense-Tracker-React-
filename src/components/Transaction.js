import React, {useContext, useState} from 'react';
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

export const Transaction = ({ transaction, onDelete }) => {
  const { deleteTransaction, updateTransaction } = useContext(GlobalContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editAmount, setEditAmount] = useState(transaction.amount);

  const sign = transaction.amount < 0 ? '-' : '+';

  const commitEdit = () => {
    const value = Number(editAmount);
    if (!Number.isFinite(value)) return setIsEditing(false);
    updateTransaction(transaction.id, { amount: value });
    setIsEditing(false);
  };

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'} style={{ animation: 'fadeInUp .25s ease both' }}>
      {transaction.text}
      <span>
        {isEditing ? (
          <>
            <input type="number" value={editAmount} onChange={(e)=>setEditAmount(e.target.value)} style={{ width: 90, marginRight: 6 }} />
            <button className="btn" style={{ width: 'auto', margin: 0, padding: '2px 6px' }} onClick={commitEdit}>Save</button>
            <button className="btn" style={{ width: 'auto', margin: 0, padding: '2px 6px' }} onClick={()=>{ setIsEditing(false); setEditAmount(transaction.amount); }}>Cancel</button>
          </>
        ) : (
          <>
            {sign}{moneyFormatter(transaction.amount)}
            <button className="btn" style={{ width: 'auto', margin: 0, marginLeft: 6, padding: '2px 6px' }} onClick={()=>setIsEditing(true)}>Edit</button>
          </>
        )}
      </span>
      <button onClick={() => (onDelete ? onDelete(transaction) : deleteTransaction(transaction.id))} className="delete-btn">x</button>
    </li>
  )
}
