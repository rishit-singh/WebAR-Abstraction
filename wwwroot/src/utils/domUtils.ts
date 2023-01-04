import {Tools, URLTools } from "./Tools" 

/*  
 * Returns true if navigator has xr with 'immersive-ar' capabilities
 * Returns false otherwise.
 */
export async function browserHasImmersiveArCompatibility(): Promise<boolean> {
  // @ts-ignore
  const isSupported: boolean = false;
  //@ts-ignore
  if (window.navigator.xr) {
    // @ts-ignore
    const isSupported: boolean = await navigator.xr.isSessionSupported(
      "immersive-ar",
    );
    console.info(
      `[DEBUG] ${isSupported
          ? "Browser supports immersive-ar"
          : "Browser does not support immersive-ar"
      }`,
    );
    alert(isSupported);
    return isSupported;
  }
  
  return isSupported;
}

export class ElementManager {
  public static Elements: Element[] = new Array<Element>();
}

export class Attribute
{
    public Key: string;
    public Value: string;
    
    protected DOMAttribute: Attr; 
    
    protected Initialize()
    {
      this.DOMAttribute = document.createAttribute(this.Key);
      
      this.DOMAttribute.value = this.Value; 
    }
    
    public ToDOMAttribute(): Attr 
    {
      return this.DOMAttribute;
    }
   
    constructor(key: string, value: string)
    { 
      this.Key = key;
      this.Value = value;
      this.DOMAttribute = new Attr(); 
    }
}

export class Div
{
  public ID: string;
  public ClassName: string;
  
  protected DOMElement: Element;
  
  public ToDOMElement(): Element
  {
    return this.DOMElement; 
  }
  
  constructor(className: string, id: string = ElementManager.Elements.length.toString()) {
    this.ClassName = className;
    this.ID = id;
    this.DOMElement = document.createElement("div");
    this.DOMElement.className = this.ClassName;
    this.DOMElement.id = this.ID; 
    
    ElementManager.Elements.push(this.ToDOMElement());
  }
}

export class Heading
{  
  public Content: string; 
  
  public Level: number;
  
  protected DOMElement: HTMLHeadingElement;
  
  protected static GetHeadingTag(level: number)
  {
    return "h" + Tools.Clamp(level, 1, 7); 
  }
 
  public ToDOMElement(): HTMLHeadingElement
  {
    return this.DOMElement;
  }
  
  constructor(content: string, headingLevel: number = 1) 
  {
    this.Content = content;
    this.Level = Tools.Clamp(headingLevel, 1, 6); 
    
    this.DOMElement = document.createElement(Heading.GetHeadingTag(this.Level)) as HTMLHeadingElement;
    this.DOMElement.innerText = this.Content;
  }  
}

/*
 * Create and display message when no XR capabilities are found.
 */
export function displayUnsupportedBrowserMessage(): void {
  const appRoot: HTMLElement | null = document.getElementById("app-root");
  const bigMessage: HTMLParagraphElement = document.createElement("p");

  
  bigMessage.innerText = "😢 Oh no!";
 
  if (appRoot) {
    appRoot.appendChild(bigMessage);
    
    var paramHash: Map<string, string>;

    // @ts-ignore
    //appRoot.appendChild(new Heading((paramHash = URLTools.GetParams()).get("heading").toString(), paramHash.get("level")).ToDOMElement());
  }

  const middleMessage: HTMLParagraphElement = document.createElement("p");


  middleMessage.innerText =
    "Your browser does not seem to support augmented reality with WebXR.";

  if (appRoot) {
    appRoot.appendChild(middleMessage);
  }
  const helpMessage: HTMLParagraphElement = document.createElement("p");

  helpMessage.innerText =
    "Try opening the page using a recent version of Chrome on Android.";
  if (appRoot) {

    appRoot.appendChild(helpMessage);
  }
}

/**
 * Create and show a simple introduction message if the device supports
 * WebXR with immersive-ar mode.
 */
export function displayIntroductionMessage(title: string) {
  const appRoot: HTMLElement | null = document.getElementById("app-root");
  if (appRoot == null) 
    return appRoot;
  
  appRoot.appendChild(new Heading(title).ToDOMElement());
}


export default {
  browserHasImmersiveArCompatibility,
  displayIntroductionMessage,
  displayUnsupportedBrowserMessage,
};
