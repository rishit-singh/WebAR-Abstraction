import { WebGLRenderer } from "three/src/renderers/WebGLRenderer";
import { ARButton } from "three/examples/jsm/webxr/ARButton";
import { createScene } from "./scene";
import {
  browserHasImmersiveArCompatibility,
  displayIntroductionMessage,
  displayUnsupportedBrowserMessage,
} from "./utils/domUtils";
import "./global"
import "./styles.css";
import "./DeviceInfo"
import {URLTools} from "./utils/Tools";
import {LandingPage} from "./Landing";
import {Heading} from "./utils/domUtils";
import { Tools } from "./utils/Tools"
import {Image} from "./Image";
import {GlobalData} from "./global";
import {Vector2D} from "./Vector";
import {Error, ErrorType} from "./Error";

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

    if (window.location.search.length == 0) {
        console.log("404");
    }
    if (!isImmersiveArSupported) {
        displayUnsupportedBrowserMessage();
        //@ts-ignore
       // let params: Map<string, string> = null;
        
        //let landingPage: LandingPage; 
        
       //@ts-ignore 
        //(landingPage = new LandingPage((params = URLTools.GetParams()).get("model").toString(), GlobalData.GetDefaultTextureMaterialPath(params.get("model").toString()))); //; //.Render();w
            //@ts-ignore
        //@ts-ignore:
        
        
        //landingPage.Render();
        return;
    }

    if (window.location.search.length == 0) {
        console.log("404");
        
        
        return;
    }
    
    var model: string = "";
    
    displayIntroductionMessage( model = Tools.GetSubString(window.location.search, 1, window.location.search.length));

    document.body.appendChild(new Image(GlobalData.GetDefaultTextureMaterialPath(model), "", new Vector2D(300, 500)).ToDOMElement());
    initializeXRApp(model);
}


start();


    
 