import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, Text, View } from 'react-native';
import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { styles } from '../styles/QRScanner.styles';

const CameraType = {
  back: 'back',
  front: 'front',
} as const;

type CameraType = typeof CameraType[keyof typeof CameraType];


const QRScannerScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const cameraRef = useRef(null); // Kamera ref tipi opsiyonel

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  const handleBarCodeScanned = ({ data }: BarcodeScanningResult) => {
    setScanned(true);
    Alert.alert('QR Kod Okundu', `Veri: ${data}`);
  };

  if (!permission) {
    return <Text>İzinler kontrol ediliyor...</Text>;
  }

  if (!permission.granted) {
    return <Text>Kamera izni verilmedi.</Text>;
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
        <Button title="Tekrar Tara" onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

export default QRScannerScreen;
