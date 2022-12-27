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
//class CSSProperty
//{
//    public Key: string;
//    public Value: string;
//    public ToString()
//    {
//        return this.Key + ':' + this.Value;
//    }


//    public constructor(key: string, value: string) {
//        this.Key = key;
//        this.Value = value;
//    }
//}

//class Error : HTMLElement
//{
//    public CSSProperties: Array<CSSProperty>;

//    public GetCssString(): string
//    {
//        let cssString: string = "";
//        let size: number = this.CSSProperties.length;

//        for (let x: number = 0; x < size; x++)
//        {
//            if (x == (size - 1))
//            {
//                cssString += ths.Properties[x].ToString();

//                continue;
//            }

//            cssString += this.CSSProperties[x].ToString() + ",";
//        }

//        return cssString;
//    }

//    protected Initialize()
//    {
//        let element: HTMLElement = document.createElement("h2");



//        this.appendChild();
//    }
//    public constructor()
//    {
//        this.CSSProperties = new Array<CSSProperty>();

//        this.Initialize();
//    }
//}

//var DefaultDeviceInfo: DeviceInfo = new DeviceInfo();

alert(window.navigator.userAgent);

function initializeXRApp() {
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

    
  // displayIntroductionMessage();

    createScene(renderer, Tools.GetSubString(window.location.search, 1, window.location.search.length));
};

async function start() {
  const isImmersiveArSupported = await browserHasImmersiveArCompatibility();

    if (window.location.search.length == 0) {
        alert("404");
    }
    if (!isImmersiveArSupported) {
        displayUnsupportedBrowserMessage();
//@ts-ignore
        let params: Map<string, string> = null;
        
        let landingPage: LandingPage; 
        
       //@ts-ignore 
        (landingPage = new LandingPage((params = URLTools.GetParams()).get("model").toString(), GlobalData.GetDefaultTextureMaterialPath(params.get("model").toString()))); //; //.Render();w
            //@ts-ignore
        //@ts-ignore:
        
        
        landingPage.Render();
        return;
    }

    if (window.location.search.length == 0) {
        alert("404");
        return;
    }
    
    initializeXRApp();
}


start();
    
 