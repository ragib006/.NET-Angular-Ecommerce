using Ecommerce.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;

using System.Security.Cryptography;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


//DATABASE COMMUNICATION
builder.Services.AddDbContext<ProductContext>(options=>options.UseSqlServer(builder.Configuration.GetConnectionString("ProductCS")));

builder.Services.AddStackExchangeRedisCache(options=>options.Configuration = "localhost:6379");
//JWT CONFIGURATION

// Your original key
//var originalKey = Encoding.ASCII.GetBytes("ragibhasan0177");


//var key = new byte[32]; // 256 bits
//using (var rng = RandomNumberGenerator.Create())
//{
//   rng.GetBytes(key);
//}


//var key = Encoding.ASCII.GetBytes("ragibhasan0177");
builder.Services.AddAuthentication(x =>
{

    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

}).AddJwtBearer(x =>
{

    x.RequireHttpsMetadata = false; // Make sure to use HTTPS in production
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("ragibhasan0177....................")),
        ValidateIssuer = false,
        ValidateAudience = false
    };


});



builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


//USE FOR CORS

app.UseCors(options =>
{

 options.AllowAnyHeader();
 options.AllowAnyOrigin();
 options.AllowAnyMethod();


});

//builder.Services.AddCors(options => options.AddPolicy(name: "FrontendUI",

// policy =>
// {
//     policy.WithOrigins("").AllowAnyMethod().AllowAnyHeader();
//  }

// ));

//USE FOR JWT
app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
