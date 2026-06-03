import { Accelerometer } from "expo-sensors";
import { Subscription } from "expo-sensors/build/Pedometer";
import { useState, useEffect, useCallback } from "react";

export function useAccelerometer() {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const _subscribe = useCallback(() => {
    setSubscription(Accelerometer.addListener(setData));
  }, []);

  const _unsubscribe = useCallback(() => {
    subscription && subscription.remove();
    setSubscription(null);
  }, [subscription]);

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  return { acceleration: { x, y, z }, subscription, _subscribe, _unsubscribe };
}
