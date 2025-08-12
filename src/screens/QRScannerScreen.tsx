import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, Text, View } from 'react-native';
import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { styles } from '../styles/QRScanner.styles';

// Define supported camera types
const CameraType = {
  back: 'back',
  front: 'front',
} as const;

type CameraType = typeof CameraType[keyof typeof CameraType];


const QRScannerScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  // Reference to the camera instance (can be used for advanced controls)
  const cameraRef = useRef(null); 

  useEffect(() => {
    // Request camera permission if not already granted
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  // Handle scanned QR code result
  const handleBarCodeScanned = ({ data }: BarcodeScanningResult) => {
    setScanned(true);
    Alert.alert('QR Code Scanned', `Data: ${data}`);
  };

  if (!permission) {
    return <Text>Checking permissions...</Text>;
  }

  if (!permission.granted) {
    return <Text>Camera permission not granted..</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={CameraType.back}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
      />
      {scanned && (
        <Button title="Scan Again" onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

export default QRScannerScreen;
