
import {Component} from "./Component"; 
import {Div, ElementManager, Heading} from "./utils/domUtils";
import {Vector2D} from "./Vector";

export class Image extends Component
{
    public Path: string;
    public Title: string;

    public Dimensions: Vector2D;
    
    public ImageElement: HTMLImageElement;
    
    public ToDOMElement(): Element {
        return this.RootElement;
    }
        
    public Initialize()
    {
        if (this.ImageElement == null) 
        {
            this.ImageElement = document.createElement("img");

            this.ImageElement.src = this.Path;
            this.ImageElement.name = this.Title;
            this.ImageElement.height = this.Dimensions.Y;
            this.ImageElement.width = this.Dimensions.X;
        }
        this.RootElement.appendChild(new Heading(this.Title, 3).ToDOMElement());
        this.RootElement.appendChild(this.ImageElement);
    }

    public static FromPath(path: string): Image
    {
        var image: Image = new Image(path, null, null);
        
        image.Path = path;
        image.Title = null;
        
        image.ImageElement = document.createElement("img");
        image.ImageElement.src = path;
        
        image.Dimensions = new Vector2D(image.ImageElement.width, image.ImageElement.height);
        
        image.Initialize();
        ElementManager.Elements.push(image.RootElement);
        console.log("Image(\"" + path + "\", \"" + image.Title + "\")");
        
        return image;
    }
    
    public static FromElement(imageElement: HTMLImageElement): Image
    {
        return new Image(imageElement.src, imageElement.name, new Vector2D(imageElement.width, imageElement.height));
    }
    
    constructor(path: string, title: string, dimensions: Vector2D) 
    {
        super(new Div("image", "image" + ElementManager.length).ToDOMElement());
   
        this.Path = path;
        this.Title = title;
        this.Dimensions = dimensions;
       
        if (this.Dimensions != null)
            this.Initialize();
        ElementManager.Elements.push(this.RootElement);
        console.log("Image(\"" + path + "\", \"" + title +"\")");
    }
}




 
 