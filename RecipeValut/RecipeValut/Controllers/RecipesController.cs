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
    public class RecipesController : ControllerBase
    {
        private readonly RecipeValutDbContext dbContext;

        public RecipesController(RecipeValutDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Recipe>>> GetRecipes()
            => new JsonResult(await this.dbContext.Recipes.ToListAsync());

        [HttpGet("{id}")]
        public async Task<ActionResult<Recipe>> GetRecipe(int id)
        {
            var recipe = await this.dbContext.Recipes.FindAsync(id);

            if (recipe == null)
            {
                return NotFound();
            }

            return new JsonResult(recipe);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecipe(int id, Recipe recipe)
        {
            if (id != recipe.Id)
            {
                return BadRequest();
            }

            this.dbContext.Entry(recipe).State = EntityState.Modified;

            try
            {
                await this.dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecipeExists(id))
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
        public async Task<ActionResult<Recipe>> PostRecipe(Recipe recipe)
        {
            this.dbContext.Recipes.Add(recipe);
            await this.dbContext.SaveChangesAsync();

            return CreatedAtAction("GetRecipe", new { id = recipe.Id }, recipe);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecipe(int id)
        {
            var recipe = await this.dbContext.Recipes.FindAsync(id);
            if (recipe == null)
            {
                return NotFound();
            }

            this.dbContext.Recipes.Remove(recipe);
            await this.dbContext.SaveChangesAsync();

            return NoContent();
        }

        private bool RecipeExists(int id)
        {
            return this.dbContext.Recipes.Any(e => e.Id == id);
        }
    }
}
