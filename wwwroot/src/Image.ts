
import {Component} from "./Component"; 
import {Div, ElementManager, Heading} from "./utils/domUtils";

export class Image extends Component
{
    public Path: string;
    public Title: string;

    public ToDOMElement(): Element {
        return this.RootElement;
    }
   
    protected Initialize()
    {
        let imageElement: HTMLImageElement = document.createElement("img");
        
        imageElement.src = this.Path;
        imageElement.name = this.Title;
        
        this.RootElement.appendChild(new Heading(this.Title, 3).ToDOMElement());
        this.RootElement.appendChild(imageElement);
    }
    
    constructor(path: string, title: string) 
    {
        super(new Div("image", "image" + ElementManager.length).ToDOMElement());
   
        this.Path = path;
        this.Title = title;
       
        this.Initialize();
        ElementManager.Elements.push(this.RootElement);
        
        console.log("Image(\"" + path + "\", \"" + title +"\")");
        
    }
}


