import {Heading} from "./utils/domUtils";
import {URLTools} from "./utils/Tools";
import {Image} from "./Image";
import {Component} from "./Component";
import {Vector2D} from "./Vector";

export class Button extends Component
{
    public Text: string;
   
    public Dimensions: Vector2D;
    
    public ToDomElement(): Element
    {
        return this.RootElement;
    } 
    
    public SetOnClickCallback(callback: ()=>any)
    {
       this.RootElement.addEventListener("click", callback); 
    }
    
    public MapCSS()
    {
        this.Properties.Add("height", this.Dimensions.Y+ "px");
        this.Properties.Add("width",  this.Dimensions.X+ "px");
        
        this.RootElement.setAttribute("style", this.Properties.ToString());
    }
    
    public constructor(text: string, className: string, dimensions: Vector2D)
    {
        super(document.createElement("button"));
        this.Text = text;
        this.RootElement.className = className;
        this.RootElement.textContent = this.Text;
        
        this.Dimensions = dimensions;
        
        this.MapCSS();
    }
}

export class Div extends Component
{
    public ID: string;
    public Class: string;
    
    public ToDOMElement(): Element
    {
        this.RootElement.className = this.Class;
        this.RootElement.id = this.ID;
        
        return this.RootElement; 
    }
    
    public constructor(id: string = "", cls: string = "")
    {
        super(document.createElement("div"));
        
        this.Class = cls;
        this.ID = id;
    }
}

export class Page
{
    public RootElement: Element;
    
    public Sections: Map<string, Element>;
    
    public AddElement(section: string, element: Element)
    {
        //@ts-ignore
        this.Sections.get(section).appendChild(element);
    }
    
    public AddSection(name: string)
    {
        this.Sections.set(name, new Div("", name).ToDOMElement());
        this.RootElement.appendChild(this.Sections.get(name) as Element);
    }
    
    public constructor(root: Element) 
    {
        this.Sections = new Map<string, Element>();
        this.RootElement = root; 
    }
}

export class LandingPage extends Page
{
    public PageHeading: Heading;
    
    public ImageObject: Image;
    
    protected Elements: Element[];
    
    public GetRootElement(): Element
    {
        return this.RootElement;
    }
    
    public Render()
    {
       if ((this.RootElement) == null)
            console.log("Null root.");
       
       for (let x: number = 0; x < this.Elements.length; x++) 
         this.RootElement.appendChild(this.Elements[x]);
        
       console.log("Render()");
    }
    
    public AppendChild(element: Element): Element
    {
        this.Elements.push(element);
        return element;
    } 
    
    public Initialize()
    {
        this.AddSection("header");
        this.AddSection("image_body");
        this.AddSection("input");
        
        this.AddElement("header", this.PageHeading.ToDOMElement());
        this.AddElement("image_body", this.ImageObject.ToDOMElement());
        
        let button: Button = new Button("Start", "default_button", new Vector2D(200, 150));
       
        button.SetOnClickCallback(()=>{console.log("clicked");});
        //@ts-ignore
        button.RootElement.style.color = "green";
        
        this.AddElement("input", button.ToDomElement());
    }
    
    
    constructor(heading: string, image: string) 
    {
        super(document.getElementsByClassName("landing-root")[0] as Element);
        
        this.PageHeading =  new Heading(heading);
        this.Sections = new Map<string, Element>(); 
        this.ImageObject = new Image(image, "", new Vector2D(100, 200));
       
        this.Elements = [];
       
        this.Initialize();
        
        console.log("LandingPage()");
    }
}

//@ts-ignore
 
