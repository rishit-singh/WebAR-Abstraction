import {Div, Page} from "./Landing";
import  {Heading} from "./utils/domUtils";
import {CSSProperties} from "./CSSProperties";


export enum ErrorType
{
    NotSupported,
    NotFound
}    

export class Error extends Page {
    public static ErrorTypeStrings: string[] = [
        "Service not supported.",
        "File not found."
    ];

    public Type: ErrorType;

    protected Heading: Element;

    public Message: string;

    protected Properties: CSSProperties;

    protected Initialize() {
        var messageElement: Element = new Div("", "error-message").ToDOMElement();
        messageElement.textContent = this.Message;

        this.RootElement.appendChild(this.Heading);
        this.RootElement.appendChild(messageElement);
    }

    
    public constructor(message: string, type: ErrorType)
    {
        super(new Div("error" + <number>type, "error").ToDOMElement());
        this.Type = type; 
        this.Message = message;
        this.Heading = new Heading(Error.ErrorTypeStrings[this.Type as number], 2).ToDOMElement();
        this.Properties = new CSSProperties();
        
        this.Initialize();
    }
}