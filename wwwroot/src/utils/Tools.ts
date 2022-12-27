export class Tools 
{
    public static InRange(value: number, start: number, end: number) {""
        return (value >= start && value < end);
    }

    public static Clamp(value: number, min: number, max: number): number
    {
        return (Math.min(Math.max(min, value), max));
    }
    
    public static StrCmp(str: string, str1: string): number
    {
        for (let x: number = 0; x < str.length; x++)
            if (str[x] < str1[x])
                return -1;
            else if (str[x] > str1[x])
                return 1;
       
        return 0;
    }
   
    public static Percentage(num: number, total: number): number
    {
        return (num / total) * 100;
    }
    
    public static IsElement<T>(value: T, array: T[]): boolean
    {
        let size: number = array.length;
        
        for (let x: number = 0; x < size; x++)
            if (array[x] == value)
                return true; 
        
        return false;
    }
    
    public static BubbleSort(array: string[]): string[]
    {   
        let size: number = array.length;
        
        let temp: string = "";
        
        for (let x = 0;  x < size; x++)
            for (let y: number = 0; y < size - x - 1; y++)
                if (Tools.StrCmp(array[y], array[y + 1]) > 0)
                {
                    temp = array[x];
                    array[x] = array[x + 1];
                    array[x + 1] = temp;
                }
            
        return array;
    }
       
    public static BinarySearch(str: string, array: string[], start: number, end: number): number
    {
        let mid: number = (start + end) / 2;
        if (start < end) 
        {
            if (!Tools.StrCmp(array[mid], str))
                return mid;
            else if (Tools.StrCmp(array[mid], str) < 0)
                return Tools.BinarySearch(str, array, 0, mid);
            else if (Tools.StrCmp(array[mid], str) > 0)
                return Tools.BinarySearch(str, array, mid + 1, end);
        }  
        
        return -1;
    }
    
    public static Search(str: string, array: string[]): number
    {
        let sorted: string[];
        
        return Tools.BinarySearch(str, sorted = Tools.BubbleSort(array), 0, sorted.length);
    }
    
    public static GetSubString(str: string, start: number, end: number): string 
    {
        let subString: string = "";
        
        //if (!Tools.InRange(start, 0, end) || !Tools.InRange(end, 0, str.length))WA:;W:
          //  return subString;

        for (let x: number = start; x < end; x++)
            subString += str[x];

        return subString;
    }

    public static SubStrCmp(subStr: string, str: string): number
    {
        let size: number;
        
        if (!Tools.InRange((size = subStr.length), 0, str.length))
            return -1;
        for (let x: number  = 0; x < size; x++)
            if (subStr[x] < str[x])
                return -1;
            else if (subStr[x] > str[x])
                return 1;
            
        return 0;
    }
    
    public static EliminateSubString(str: string, subStr: string): string
    {
        let alteredString: string = "";
        let size: number = str.length,
            stride: number = subStr.length;

        for (let x: number = 0; x < size; x++) 
        {
            if (Tools.GetSubString(str, x, x + stride) == subStr) 
            {
                x += stride;
                continue;
            }
            
            alteredString += str[x];
        }
       
        return alteredString;
    }
    
    public static Split(str: string, chr: string): string[]
    {
        let splitBuffer: Array<string> = new Array<string>();
        
        let size: number = str.length, start: number = 0,end: number = 0;
        
        end = str.indexOf(chr, start);
        
        for (let x = 0; x < size; x++, start = end + chr.length, end = str.indexOf(chr, start))
        {
            if (end == -1) 
            {
               splitBuffer.push(Tools.GetSubString(str, start, size));
               continue;
            }
            
            splitBuffer.push(Tools.GetSubString(str, start, end));
        }
        
        return  splitBuffer;
    }
    
    public static StrCmpCont(str: string, str1: string): number 
    {
        let matchCount: number = 0; 
        
        while (str[matchCount++] == str1[matchCount]);
        
        return matchCount;
    }
 
    public static GetContinuousMatchPercentage(str: string, str1: string): number
    {
        return (Tools.Percentage(Tools.StrCmpCont(str, str1), str.length));
    }
} 

export class URLTools
{
    public static GetParams(): Map<string, string>
    {
        let splitStack: string[] = Tools.Split(Tools.GetSubString(window.location.search, 1, window.location.search.length), "&"), temp: string[];
        let size: number = splitStack.length;
        let paramHash: Map<string, string> = new Map<string, string>();
        
        for (let x: number = 0; x < size; x++)
            paramHash.set((temp = Tools.Split(splitStack[x], "="))[0], temp[1]); 
        return paramHash;
    }
}


 
