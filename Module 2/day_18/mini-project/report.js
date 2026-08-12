export const totalByType = (txns, type) =>
  txns
    .filter(t => t.type === type)
    .reduce((sum, { amount }) => sum + amount, 0);

export const generateReceipts = (txns) =>
  txns.map(({ customer, amount, type }) => 
    `Receipt for ${customer}: ${amount} ETB (${type.toUpperCase()})`
  );

export const updateTransactionAmount = (txns, id, newAmount) => {
  const target = txns.find(t => t.id === id);
  if (!target) return null;
  
  return { ...target, amount: newAmount };
};