// Hook to check if the current user has an active subscription in Supabase.
import { useEffect, useState } from 'react';
import { supabase, useAuth } from '@/app/contexts/AuthContext';

export type SubscriptionStatus = 'loading' | 'active' | 'inactive' | 'unauthenticated';

export function useSubscription() {
  const { user } = useAuth();
  const [status, setStatus] = useState<SubscriptionStatus>('loading');

  useEffect(() => {
    if (!user) {
      setStatus('unauthenticated');
      return;
    }

    const check = async () => {
      setStatus('loading');
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from('subscriptions')
        .select('id, status, end_at')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .gte('end_at', now)
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Subscription check error:', error);
        setStatus('inactive');
        return;
      }

      setStatus(data ? 'active' : 'inactive');
    };

    check();
  }, [user]);

  return status;
}
