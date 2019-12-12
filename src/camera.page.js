// src/camera.page.js file
import React, {useState, useRef, useEffect}  from 'react';
import { View, Text } from 'react-native';
import { Camera } from 'expo-camera';
import Toolbar from './toolbar.component';
import Gallery from './gallery.component';

import styles from './styles';


const MyCamera = () => {
    camera = null;
    let camRf = useRef(null)
    let [captures,setCaptures] = useState([])
    let [capturing, setCapturing] = useState('null') 
    let [type, setCameraType] = useState(Camera.Constants.Type.back)
    let [flash, setFlashMode] = useState(Camera.Constants.FlashMode.off)
    let [camPerm, setcamPerm] = useState('null')

    

   
    handleCaptureIn = () => setCapturing(true);
    
    handleCaptureOut = () => {
        if (capturing)
            camRf.current.stopRecording();
    };

    handleShortCapture = async () => {
        const photoData = await camRf.current.takePictureAsync();
        setCapturing(false);
        setCaptures([photoData, ...captures]);
    };

    handleLongCapture = async () => {
        const videoData = await camRf.current.recordAsync();
        setCapturing(false);
        setCaptures([videoData, ...captures]);
    };

    
    
    useEffect(() => {
      (async function anon() {
        const camera = await camPerms.askAsync(camPerms.CAMERA);
        const audio = await camPerms.askAsync(camPerms.AUDIO_RECORDING);
        const hasCameracamPerm = (camera.status === 'granted' && audio.status === 'granted');
        setcamPerm(hasCameracamPerm);
      })();
    }, []); 

    
       
        if (camPerm === null) {
            return <View />;
        } else if (camPerm === false) {
            return <Text>Access to camera has been denied.</Text>;
        }

        return (
            <React.Fragment>
                <View>
                    <Camera
                        type = {type}
                        flashMode={flash}
                        style={styles.preview}
                        ref={camRf}
                    />
                </View>

                {captures.length > 0 && <Gallery captures={captures}/>}

                <Toolbar 
                    capturing={capturing}
                    flashMode={flash}
                    cameraType = {type}
                    setFlashMode = {setFlashMode}
                    setCameraType = {setCameraType}
                    onCaptureIn = {handleCaptureIn}
                    onCaptureOut = {handleCaptureOut}
                    onLongCapture = {handleLongCapture}
                    onShortCapture = {handleShortCapture}
                />
            </React.Fragment>
        );
};

export default MyCamera;