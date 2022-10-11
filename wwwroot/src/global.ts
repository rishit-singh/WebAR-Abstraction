import { DeviceInfo } from "./DeviceInfo"

export class GlobalData {
    public static DefaultDeviceInfo: DeviceInfo;
    
    public static GetDefaultDeviceInfo(): DeviceInfo
    {
        let deviceInfo: DeviceInfo = new DeviceInfo();
       
        return deviceInfo;
    }
}
