
import {Component} from "./Component"; 
import {Div, ElementManager, Heading} from "./utils/domUtils";
import {Vector2D} from "./Vector";

export class Image extends Component
{
    public Path: string;
    public Title: string;

    public Dimensions: Vector2D;
    
    public ToDOMElement(): Element {
        return this.RootElement;
    }
   
    protected Initialize()
    {
        let imageElement: HTMLImageElement = document.createElement("img");
        
        imageElement.src = this.Path;
        imageElement.name = this.Title;
        imageElement.height = this.Dimensions.Y;
        imageElement.width = this.Dimensions.X;
        
        this.RootElement.appendChild(new Heading(this.Title, 3).ToDOMElement());
        this.RootElement.appendChild(imageElement);
    }
    
    constructor(path: string, title: string, dimensions: Vector2D) 
    {
        super(new Div("image", "image" + ElementManager.length).ToDOMElement());
   
        this.Path = path;
        this.Title = title;
        this.Dimensions = dimensions;
        
        this.Initialize();
        ElementManager.Elements.push(this.RootElement);
        console.log("Image(\"" + path + "\", \"" + title +"\")");
    }
}



