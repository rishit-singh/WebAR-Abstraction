export class CSSProperties
{
    protected PropertiesMap: Map<string, string>;
   
    public ToString()
    {
        let cssString: string  = "";
        
        let keys = this.PropertiesMap.keys(),
            values = this.PropertiesMap.values();
        
        let size:number = this.PropertiesMap.size;
        
        for (let x: number = 0; x < size; x++)
            cssString += keys.next().value.toString() + ":" + values.next().value.toString() + ";";
        
        return cssString;
    }
    
    public Add(key: string, value: string)
    {
        this.PropertiesMap.set(key, value);
    }
    
    public constructor()
    {
        this.PropertiesMap = new Map<string, string>();
    }
}

