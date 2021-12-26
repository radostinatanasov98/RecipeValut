using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeValut.Data;
using RecipeValut.Data.Models;
using RecipeValut.Models.Users;

namespace RecipeValut.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private const string loginErrorMessage = "Invalid username or password.";

        private readonly RecipeValutDbContext dbContext;

        public UsersController(RecipeValutDbContext context)
        {
            this.dbContext = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
            => new JsonResult(await this.dbContext.Users.ToListAsync());

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(string stringId)
        {
            var id = int.Parse(stringId);

            var user = await this.dbContext.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return new JsonResult(user);
        }

        [HttpPost]
        [Route("Register")]
        public async Task<ActionResult<User>> Register(UserFormModel userFormModel)
        {
            var user = new User
            {
                Username = userFormModel.Username,
                Password = userFormModel.Password
            };

            await this.dbContext.Users.AddAsync(user);
            await this.dbContext.SaveChangesAsync();

            return Ok(new 
            {
                Message = "Success!"
            });
        }

        [HttpPost]
        [Route("Login")]
        public IActionResult Login([FromBody]UserFormModel userFormModel)
        {
            if (!this.dbContext.Users.Any(u => u.Username == userFormModel.Username))
                return BadRequest(new { Response = loginErrorMessage });

            var user = this.dbContext.Users.First(u => u.Username == userFormModel.Username);

            if (user.Password != userFormModel.Password)
                return BadRequest(new { Response = loginErrorMessage });

            this.Response.Cookies.Append("id", user.Id.ToString(), new CookieOptions
            {
                HttpOnly = true
            });

            return Ok(new
            {
                Message = "Success!"
            });
        }

        [HttpPost]
        public IActionResult LogOut()
        {
            this.Response.Cookies.Delete("id");

            return Ok(new
            {
                Message = "Success!"
            });
        }

        private bool UserExists(int id)
        {
            return this.dbContext.Users.Any(e => e.Id == id);
        }
    }
}
