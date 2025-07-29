import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PageContainer from "../../components/PageContainer";
import TextPrimary from "../../components/texts/text";
import tw from "../../lib/tailwind";
import { SafeAreaView } from "react-native-safe-area-context";
import InputTextWithLabel from "../../components/inputs/InputWithLabel";
import BackButton from "../../components/BackButton";
import Header from "../../components/texts/header";
import PrimaryButton from "../../components/buttons/PrimaryButtom";

export default function ScanTicket({ navigation }: any) {
  const [facing, setFacing] = useState<CameraType>("back");
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const [requestId, setRequestId] = useState("");
  const [timer, setTimer] = useState(30);

  // useEffect(() => {
  //   if (scanned) return; // Stop timer if already scanned

  //   const countdown = setInterval(() => {
  //     setTimer((prev) => {
  //       if (prev <= 1) {
  //         clearInterval(countdown);
  //         if (!scanned) {
  //           Alert.alert(
  //             "Timeout",
  //             "QR scan timed out after 30 seconds. Adjust the camera properly."
  //           );
  //         }
  //         return 0;
  //       }
  //       return prev - 1;
  //     });
  //   }, 1000);

  //   return () => clearInterval(countdown); // Cleanup on unmount
  // }, [scanned]);

  useEffect(() => {
    if (scanned) {
      const timeout = setTimeout(() => setScanned(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [scanned]);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    console.log("i ran", data);
    if (!scanned) {
      setScanned(true);
      navigation.navigate("PassTicketScreen", {
        requestId: data,
        method: "qr_code",
      });
    }
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <PageContainer padding="0%" style={styles.container}>
      <View style={tw` flex-row justify-between px-[5%]`}>
        <BackButton onPress={() => navigation.goBack()} />
        <Header font="semi_bold" size={16}>
          Scan
        </Header>
        <View />
      </View>
      <View style={tw`px-[5%] mt-5`}>
        <TextPrimary size={12} style={tw`text-[#A3A2A2]`}>
          Verify users for :{" "}
          <TextPrimary size={12} style={tw`text-blue`}>
            Google Event
          </TextPrimary>
        </TextPrimary>

        <View
          style={tw`p-3 my-6 border border-gray border-dashed rounded-[10px] h-[180px]`}
        >
          {/* <TextInput/> */}
          <InputTextWithLabel
            placeholder="Enter event request ID"
            bodyStyle={tw`flex-1`}
            label="Verify with Request ID"
            value={requestId}
            onChangeText={(text) => setRequestId(text)}
          />
          <PrimaryButton
            disabled={!requestId}
            onPress={() =>
              navigation.navigate("PassTicketScreen", {
                requestId: requestId,
                method: "ticket_id",
              })
            }
          >
            Proceed
          </PrimaryButton>
        </View>
      </View>
      {/* <CameraView
          style={styles.camera}
          facing={facing}
          autofocus="on"
          onBarcodeScanned={({ data }) => {
            console.log("qrcode and I ran", data);
            navigation.navigate("PassTicketScreen", {
              requestId: data,
              method: "qr_code",
            });

            // handleBarCodeScanned(data);
          }}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
        >
          <View style={styles.overlay}>
            <Text style={styles.timerText}>Keep your hands steady</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </CameraView> */}
      <CameraView
        style={styles.camera}
        facing={facing}
        autofocus="on"
        onBarcodeScanned={handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      >
        {/* Timer or instructions */}
        <View style={styles.overlay}>
          <Text style={styles.timerText}>Keep your hands steady</Text>
        </View>

        {/* ✅ Scanner Frame Box */}
        <View pointerEvents="none" style={styles.scannerFrameContainer}>
          <View style={styles.scannerFrame} />
        </View>

        {/* Flip Camera Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  overlay: {
    position: "absolute",
    top: 20,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 8,
    borderRadius: 8,
  },
  timerText: {
    color: "#fff",
    fontSize: 16,
  },
  scannerFrameContainer: {
    position: "absolute",
    top: "20%",
    left: "10%",
    width: "80%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },

  scannerFrame: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: "#00FF00", // neon green
    borderRadius: 12,
    borderStyle: "dashed",
    backgroundColor: "transparent",
  },
});

{
  /* <CameraView
style={StyleSheet.absoluteFillObject}
facing="back"
onBarcodeScanned={({ data }) => {
  if (data && !qrLock.current) {
    qrLock.current = true;
    setTimeout(async () => {
      await Linking.openURL(data);
    }, 500);
  }
}}
/> */
}
