import {DeviceInfo, Platform} from "./DeviceInfo"
import {Tools} from "./utils/Tools"

export class GlobalData 
{
    public static DefaultDeviceInfo: DeviceInfo

    public static DefaultTextureMaterialPath: string = "assets/";

    public static DefaultModelPath: string = "assets/models/";
  
    public static DefaultTextureMaterialURL = "http://144.202.95.203/textures/";
    
    public static DefaultStorageServerURL = "https://storage.googleapis.com/arusdz/"; 
    
    public static DefaultTextureFileExtension: string =  ".jpg";
            
    public static GetDefaultTextureMaterialPath(textureName: string): string
    {
        //let objects: any[] = [ Tools.GetSubString(window.location.search, 1, window.location.search.length - 1) ];

        return (GlobalData.DefaultTextureMaterialURL + textureName + GlobalData.DefaultTextureFileExtension);
    }
    
    public static GetDefaultModelPath(modelName: string): string
    {
        return (GlobalData.DefaultStorageServerURL + modelName + ".usdz");
    }
    
    public static GetDeviceInfo(): DeviceInfo
    {
        let deviceInfo: DeviceInfo = new DeviceInfo();
        
        let splitArray: string[] = Tools.Split(window.navigator.userAgent.toString(), ' ');
        
        let size: number = DeviceInfo.PlatformStrings.length;
        let x: number;
        
        for (let x: number = 0; x < size;  x++)
            if (Tools.IsElement<string>(DeviceInfo.PlatformStrings[x], splitArray))
                deviceInfo.DevicePlatform = x as Platform;
        
        return deviceInfo;
    }
}
