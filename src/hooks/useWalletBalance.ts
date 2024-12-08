import { useAccount, useBalance } from 'wagmi';

export function useWalletBalance() {
  const { address } = useAccount();
  const { data: balance } = useBalance({
    address,
  });

  return {
    balance: balance?.formatted || '0',
    address,
    isConnected: !!address,
  };
}