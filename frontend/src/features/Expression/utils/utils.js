import {
    FaceLandmarker,
    FilesetResolver
} from "@mediapipe/tasks-vision";
import { getAvailableCameras, startCamera } from "./camera";


export const init = async ({ landmarkerRef, videoRef, streamRef }) => {
    try {
        // --------- Load MediaPipe ----------
        const vision = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

        landmarkerRef.current = await FaceLandmarker.createFromOptions(
            vision,
            {
                baseOptions: {
                    modelAssetPath:
                        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task"
                },
                outputFaceBlendshapes: true,
                runningMode: "VIDEO",
                numFaces: 1
            }
        );

        // --------- 🔥 CAMERA DETECTION ----------
        const cameras = await getAvailableCameras();

        if (!cameras.length) {
            console.error("No cameras found");
            return;
        }

        // --------- SMART SELECTION ----------
       const selectedCamera =
  cameras.find(cam =>
    cam.label.toLowerCase().includes("usb") ||
    cam.label.toLowerCase().includes("webcam") ||
    cam.label.toLowerCase().includes("integrated")
  ) ||
  cameras.find(cam =>
    !cam.label.toLowerCase().includes("virtual")
  ) ||
  cameras[0]; 

        console.log("Using camera:", selectedCamera.label);

        // --------- START CAMERA ----------
        const stream = await startCamera(selectedCamera.id);
        streamRef.current = stream;

        videoRef.current.srcObject = stream;
        await videoRef.current.play();

    } catch (err) {
        console.error("Init error:", err);
    }
};

export const detect = ({ landmarkerRef, videoRef, setExpression }) => {
    if (!landmarkerRef.current || !videoRef.current) return;

    const results = landmarkerRef.current.detectForVideo(
        videoRef.current,
        performance.now()
    );

    if (results.faceBlendshapes?.length > 0) {
        const blendshapes = results.faceBlendshapes[ 0 ].categories;

        const getScore = (name) =>
            blendshapes.find((b) => b.categoryName === name)?.score || 0;

        const smileLeft = getScore("mouthSmileLeft");
        const smileRight = getScore("mouthSmileRight");
        const jawOpen = getScore("jawOpen");
        const browUp = getScore("browInnerUp");
        const frownLeft = getScore("mouthFrownLeft");
        const frownRight = getScore("mouthFrownRight");

        console.log(getScore("mouthFrownLeft"))

        let currentExpression = "Neutral";

        if (smileLeft > 0.5 && smileRight > 0.5) {
            currentExpression = "happy😁";
        } else if (jawOpen > 0.2 && browUp > 0.2) {
            currentExpression = "surprised😮";
        } else if (frownLeft > 0.0001 && frownRight > 0.0001) {
            currentExpression = "sad😢";
        }

        setExpression(currentExpression);

        return currentExpression
    }
};