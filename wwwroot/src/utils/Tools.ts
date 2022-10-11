export class Tools
{
    public static InRange(value: number, start: number, end: number) {
        return (value >= start && value < end);
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
       
    public static GetSubString(str: string, start: number, end: number) 
    {
        let subString: string = "";
        
        //if (!Tools.InRange(start, 0, end) || !Tools.InRange(end, 0, str.length))WA:;W:
          //  return subString;

        for (let x: number = start; x < end; x++)
            subString += str[x];

        return subString;
    }
    
    public static Split(str: string, chr: string)
    {
        let splitBuffer: Array<string> = new Array<string>();
        let temp: string = "";
        let size: number = str.length,
            stride: number = chr.length;

        for (let x = 0; x < size; x++)
        {
            if (Tools.GetSubString(str, x, x + stride) == chr || x == (size - 1)) {
                splitBuffer.push(temp);
                temp = "";
                x += stride; //- 1;
                continue;
            }
            
            temp += str[x];
        }

        return splitBuffer;
    }
}
