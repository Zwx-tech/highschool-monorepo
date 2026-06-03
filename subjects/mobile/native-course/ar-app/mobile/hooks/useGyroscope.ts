import { Gyroscope } from 'expo-sensors';
import { useState, useEffect } from 'react';
import { Subscription } from 'expo-sensors/build/Pedometer';

export function useGyroscope() {
    const [{ x, y, z }, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
      });
      const [subscription, setSubscription] = useState<Subscription | null>(null);
    
      const _slow = () => Gyroscope.setUpdateInterval(1000);
      const _fast = () => Gyroscope.setUpdateInterval(16);
    
      const _subscribe = () => {
        setSubscription(
          Gyroscope.addListener(gyroscopeData => {
            setData(gyroscopeData);
          })
        );
      };
    
      const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
      };
    
      useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
      }, []);


      return {rotation: {x, y, z}, subscription, _subscribe, _unsubscribe};
}