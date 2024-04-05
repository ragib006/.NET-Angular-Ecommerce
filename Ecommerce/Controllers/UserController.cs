using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Ecommerce.Models;
namespace Ecommerce.Controllers;

using Microsoft.Build.Tasks.Deployment.Bootstrapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Authorization;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{



    ProductContext _dbContext;

    public UserController(ProductContext dbContext)
    {
        _dbContext = dbContext;

    }




    [Authorize]

    [Route("alluser")]
    [HttpGet]
    // public async Task<ActionResult<User>> getalluser()
    public async Task<ActionResult<IEnumerable<User>>> getalluser()
    {
        // return await _dbContext.Products.ToListAsync();

        if (_dbContext.Users == null)
        {
            return NotFound();
        }

        return await _dbContext.Users.ToListAsync();


    }





    [Route("login")]
    [HttpPost]

    public async Task<IActionResult> Authentication(User userObj)
    {


        // var existinguser = await _dbContext.Users.FirstOrDefaultAsync(p => p.Email == userObj.Email && p.Password == userObj.Password);

        // if (existinguser != null)

        var existingUser = await _dbContext.Users.FirstOrDefaultAsync(p => p.Email == userObj.Email);

        if (existingUser != null && BCrypt.Net.BCrypt.Verify(userObj.Password, existingUser.Password))


        {


            existingUser.Token = GenerateJwtToken(existingUser);

            // var Token = GenerateJwtToken(existingUser);

          //  var id = existingUser.id;

            return Ok(new
            {
                Message = "Login Success",
                id = existingUser.Id,
                username = existingUser.Username,
                email = existingUser.Email,
                firstName = existingUser.FirstName,
                lasttName = existingUser.LastName,
                Token = existingUser.Token
               // token = Token
            });
            //   return Ok(new
            //  {
            //      Message = "Login Success"

            //  }); 


        }
        return Conflict(new { message = "Email or Password Error" });


    }


    [Route("register")]
    [HttpPost]

    public async Task<IActionResult> Registeruser(User userObj)
    {


        if (userObj == null)
        {
            
            return Conflict(new { message = " Empty Data" });
        }

          var existinguser = await _dbContext.Users.FirstOrDefaultAsync(p => p.Email == userObj.Email);

          if (existinguser != null)
          {
              return Conflict(new { message = "This User Already Exist" });

          }

        userObj.Password = BCrypt.Net.BCrypt.HashPassword(userObj.Password);

        userObj.Role = "User";
        userObj.Token = "";

        _dbContext.Users.Add(userObj);
        await _dbContext.SaveChangesAsync();

        return Ok(new
        {

            Message = "User Register Successfull"

        }); 

      
    }

    //generate jwt function
    

    private string GenerateJwtToken(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
       
        // Your original key
        var originalKey = Encoding.ASCII.GetBytes("ragibhasan0177....................");

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
         
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
           //new Claim(ClaimTypes.Id, user.Id),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role),
            new Claim(ClaimTypes.Name,$"{user.FirstName} {user.LastName}")
          //  new Claim(ClaimTypes.Email,$"{user.Email}"),
          //  new Claim(ClaimTypes.Role,$"{user.Role}"),

            }),

            
  


        Expires = DateTime.UtcNow.AddDays(7), // Token expires in 7 days, adjust as needed
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(originalKey), SecurityAlgorithms.HmacSha256)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }





}
