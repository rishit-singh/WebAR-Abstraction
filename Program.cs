using System.Net;
using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.HttpOverrides;

namespace WebAR_Abstraction
{
    public class Program
    {
        public static void ConfigureServices(ref WebApplicationBuilder builder)
        {
            builder.Services.AddRazorPages();
            
            builder.Services.Configure<ForwardedHeadersOptions>(options => {
                options.KnownProxies.Add(IPAddress.Parse("10.0.0.100"));
                options.KnownProxies.Add(IPAddress.Parse("10.0.10.14"));
            });

            builder.Services.AddCors(o => o.AddPolicy("CorsPolicy", service =>
            {
                service.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
            }));
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

            app.UseCors("CorsPolicy");
            
            app.Run();
        }
    }
}

