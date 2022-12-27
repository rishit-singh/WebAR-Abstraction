import "./utils/Tools"

export enum Platform
{
    Unknown = -1,
    Android,
    iOS 
}

export enum Browser
{
    Chromium,
    Gecko,
    WebKit
}

export class DeviceInfo 
{
    public static PlatformStrings: string[] = [
        "Android",
        "iPhone"
    ]; 
   
    public DevicePlatform: Platform;
    public DeviceBrowser: Browser;
    
    public ToJson(): string
    {
        return  JSON.stringify(this);
    }
    
    public constructor() 
    {
        this.DevicePlatform = Platform.Unknown;
        this.DeviceBrowser = Browser.Chromium;
    }
}


