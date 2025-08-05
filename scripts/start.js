const { exec, execSync } = require('child_process');
const path = require('path');

const sdkPath = `${process.env.LOCALAPPDATA}\\Android\\Sdk`;
const emulatorName = 'Medium_Phone_API_36.0';
const emulatorPath = path.join(sdkPath, 'emulator', 'emulator.exe');

function isEmulatorRunning() {
  try {
    const result = execSync('adb devices').toString();
    return result.includes('emulator');
  } catch {
    return false;
  }
}

if (!isEmulatorRunning()) {
  console.log('📱 Emülatör başlatılıyor...');
  exec(`"${emulatorPath}" -avd ${emulatorName}`);
}
