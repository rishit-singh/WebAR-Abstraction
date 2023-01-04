import {CSSProperties} from "./CSSProperties";

export class Component
{
     public RootElement: Element;
     public Position: string;

     protected Properties: CSSProperties;
     
     public ToDOMElement(): Element
     {
          return this.RootElement;
     }
     
     public MapCSS()
     {
          this.RootElement.setAttribute("style", this.Properties.ToString());
     }
     
     constructor(rootElement: Element)
     {
          this.RootElement = rootElement; 
          this.Position = "relative";
          //@ts-ignore
          this.RootElement.style.Position = this.Position;
          this.Properties = new CSSProperties();
          
     }
}