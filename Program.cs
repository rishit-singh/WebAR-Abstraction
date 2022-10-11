namespace WebAR_Abstraction
{
    public class Program
    {
        public static void ConfigureServices(ref WebApplicationBuilder builder)
        {
            builder.Services.AddRazorPages();
        }

        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
        
            Program.ConfigureServices(ref builder);

            var app = builder.Build();

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            
            app.MapGet("/", () => "Hello World!");
            app.MapRazorPages();
            

            app.Run();
        }
    }

}