using System.Net;
using Microsoft.AspNetCore.HttpOverrides;

namespace WebAR_Abstraction
{
    public class Program
    {
        public static void ConfigureServices(ref WebApplicationBuilder builder)
        {
            builder.Services.AddRazorPages();
            
            builder.Services.Configure<ForwardedHeadersOptions>(options =>
            {
                options.KnownProxies.Add(IPAddress.Parse("10.0.0.100"));
            });
        }
            
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
        
            Program.ConfigureServices(ref builder);

            var app = builder.Build();

            app.UseHttpsRedirection();
            app.UseStaticFiles();
        
            app.UseRouting();

            app.UseForwardedHeaders(new ForwardedHeadersOptions()
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });
            
            app.MapGet("/", () => "Hello World!");
            app.MapRazorPages();

            app.Run();
        }
    }
}
