// utils/camera.js

export const getAvailableCameras = async () => {
  await navigator.mediaDevices.getUserMedia({ video: true });

  const devices = await navigator.mediaDevices.enumerateDevices();

  return devices
    .filter((d) => d.kind === "videoinput")
    .map((cam, i) => ({
      id: cam.deviceId,
      label: cam.label || `Camera ${i + 1}`,
    }));
};

export const startCamera = async (deviceId) => {
  return await navigator.mediaDevices.getUserMedia({
    video: {
      deviceId: deviceId ? { exact: deviceId } : undefined,
    },
  });
};