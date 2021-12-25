using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeValut.Data;
using RecipeValut.Data.Models;
using RecipeValut.Models.Users;

namespace RecipeValut.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly RecipeValutDbContext dbContext;

        public UsersController(RecipeValutDbContext context)
        {
            this.dbContext = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
            => new JsonResult(await this.dbContext.Users.ToListAsync());

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await this.dbContext.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return new JsonResult(user);
        }

        [HttpPost]
        public async Task<ActionResult<User>> Register(UserFormModel userFormModel)
        {
            var user = new User
            {
                Username = userFormModel.Username,
                Password = userFormModel.Password
            };

            await this.dbContext.Users.AddAsync(user);
            await this.dbContext.SaveChangesAsync();

            return Ok();
        }

        private bool UserExists(int id)
        {
            return this.dbContext.Users.Any(e => e.Id == id);
        }
    }
}
