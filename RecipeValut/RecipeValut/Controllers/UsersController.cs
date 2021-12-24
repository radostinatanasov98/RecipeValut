using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeValut.Data;
using RecipeValut.Data.Models;

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

        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            this.dbContext.Entry(user).State = EntityState.Modified;

            try
            {
                await this.dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            this.dbContext.Users.Add(user);
            await this.dbContext.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await this.dbContext.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            this.dbContext.Users.Remove(user);
            await this.dbContext.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return this.dbContext.Users.Any(e => e.Id == id);
        }
    }
}
