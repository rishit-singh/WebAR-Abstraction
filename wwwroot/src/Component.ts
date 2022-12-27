export class Component
{
     public RootElement: Element;
     public Position: string;
     
     public ToDOMElement(): Element
     {
          return this.RootElement;
     }
     
     constructor(rootElement: Element)
     {
          this.RootElement = rootElement; 
          this.Position = "relative";
          //@ts-ignore
          this.RootElement.style.Position = this.Position;
     }
}