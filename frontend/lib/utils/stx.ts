/**
 * Formats a Stacks address for display, truncating the middle part.
 * Example: 'SP3FGQ8Z7YG...4QHQ' -> 'SP3FG...4QHQ'
 */
export function abbreviateAddress(address: string, charsStart: number = 5, charsEnd: number = 4): string {
  if (!address) return "";
  if (address.length <= charsStart + charsEnd) return address;
  return `${address.substring(0, charsStart)}...${address.substring(address.length - charsEnd)}`;
}

/**
 * Converts micro-STX (as a number, string, or bigint) to a readable STX format.
 */
export function formatStxAmount(microStx: string | number | bigint): string {
  const microStxBigInt = BigInt(microStx);
  const stx = microStxBigInt / BigInt(1_000_000);
  const remainingMicroStx = microStxBigInt % BigInt(1_000_000);
  
  if (remainingMicroStx === BigInt(0)) {
    return `${stx.toLocaleString()} STX`;
  }
  
  const decimalPart = Number(remainingMicroStx) / 1_000_000;
  const formatted = `${stx.toLocaleString()}.${decimalPart.toFixed(6).substring(2)} STX`;
  return formatted;
}

/**
 * Converts general SIP-010 token amounts based on their decimals.
 */
export function formatTokenAmount(amount: string | number | bigint, decimals: number = 6): string {
  const amountBigInt = BigInt(amount);
  const divisor = BigInt(10 ** decimals);
  const wholePart = amountBigInt / divisor;
  const fractionalPart = amountBigInt % divisor;
  
  if (fractionalPart === BigInt(0)) {
    return wholePart.toLocaleString();
  }
  
  const fractionalNumber = Number(fractionalPart) / (10 ** decimals);
  const formatted = `${wholePart.toLocaleString()}.${fractionalNumber.toFixed(decimals).substring(2)}`;
  return formatted;
}
