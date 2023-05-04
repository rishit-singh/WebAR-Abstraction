import {WebGLRenderer} from "three/src/renderers/WebGLRenderer";
import {ARButton} from "three/examples/jsm/webxr/ARButton";
import {createScene} from "./scene";
import {
  browserHasImmersiveArCompatibility,
  displayIntroductionMessage,
  displayUnsupportedBrowserMessage,
} from "./utils/domUtils";
import "./global"
import "./styles.css";
import "./DeviceInfo"
import {Tools} from "./utils/Tools";
import {Image} from "./Image";
import {GlobalData} from "./global";
import {Vector2D} from "./Vector";
import {Platform} from "./DeviceInfo";
import {TextureTools} from "./TextureTools";

function initializeXRApp(model: string) {
  const{  devicePixelRatio, innerHeight, innerWidth } = window;
    
  const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(devicePixelRatio);

  renderer.xr.enabled = true;

  document.body.appendChild(renderer.domElement);

  var button;

  document.body.appendChild(
    button = ARButton.createButton(renderer, { requiredFeatures: ["hit-test"] }),
  );

  button.click();

  createScene(renderer, model);
};

async function start() {
  const isImmersiveArSupported = await browserHasImmersiveArCompatibility();
    
    let model: string = Tools.GetSubString(window.location.search, 1, window.location.search.length);

    if (GlobalData.DefaultDeviceInfo.DevicePlatform == Platform.iOS) {
      window.location.replace(GlobalData.GetDefaultModelPath(model));
    
     return;
    }
    
    if (window.location.search.length == 0) {
        console.log("404");
    }
    
    if (!isImmersiveArSupported) {
        displayUnsupportedBrowserMessage();
        //landingPage.Render();
        return;
    }

    if (window.location.search.length == 0) {
        console.log("404");
        
        return;
    }

  GlobalData.DefaultDeviceInfo = GlobalData.GetDeviceInfo();
    
    displayIntroductionMessage(model);

  // document.body.appendChild(new Image(GlobalData.GetDefaultTextureMaterialPath(model), "", new Vector2D(300, 500)).ToDOMElement());
    initializeXRApp(model);
}
export async function fetchImage(url: string): Promise<HTMLImageElement>
{
  const img = document.createElement("img");
  img.src =  URL.createObjectURL(await (await fetch(url)).blob());
  return img;
}

start();


    
 