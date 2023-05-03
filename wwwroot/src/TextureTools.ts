import * as http from 'http';
import {Image} from "./Image";

export class TextureTools
{
    public static CanvasInstance: HTMLCanvasElement = document.createElement("canvas");
   
    public static InitializeCanvas()
    {
        if (this.CanvasInstance === undefined)
            TextureTools.CanvasInstance = document.createElement("canvas");
    }
    
    public static CropImage(image: HTMLImageElement, x: number, y: number, height: number, width: number)
    {
        TextureTools.InitializeCanvas(); 
        
        this.CanvasInstance.height = height;
        this.CanvasInstance.width = width;
        
        document.getElementById("app-root").appendChild(image);   
        
        const context = this.CanvasInstance.getContext("2d");
        context.drawImage(image, x, y, width, height, 0, 0, width, height);

        const croppedImage = document.createElement("img");
        croppedImage.src = this.CanvasInstance.toDataURL("image/jpeg", 0.9);
        
        return croppedImage; // Image.FromElement(croppedImage);
    }
} 


