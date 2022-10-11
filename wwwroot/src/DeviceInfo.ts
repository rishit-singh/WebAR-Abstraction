import "./utils/Tools"

export enum Platform
{
    Web=-1,
   Android,
   iOS 
}



export class DeviceInfo {
    public static PlatformStrings: string[][] = [
        [
            "Web",
            ""
        ],
        [
            "Mozilla",
        ], 
        [
        ]
    ];
    
    public OS: Platform;
    
    public constructor() 
    {
        this.OS = Platform.Web;
    }
}

