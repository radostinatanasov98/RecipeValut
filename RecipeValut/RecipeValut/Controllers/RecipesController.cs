using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RecipeValut.Data;
using RecipeValut.Data.Models;
using RecipeValut.Models.Recipe;

namespace RecipeValut.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        private readonly RecipeValutDbContext dbContext;

        public RecipesController(RecipeValutDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        [Route("GetRecipes")]
        public async Task<ActionResult<IEnumerable<Recipe>>> GetRecipes()
        {
            var query = this.dbContext.Recipes.Select(r => new RecipeViewModel
            {
                Name = r.Name,
                Description = r.Description,
                Instructions = r.Instructions,
                Type = this.dbContext.Types.First(t => t.Id == r.TypeId).Name,
                LikesCount = r.LikesCount,
                Id = r.Id,
                UserId = r.UserId,
                ImageUrl = r.ImageUrl
            });

            return new JsonResult(query);
        }

        [HttpGet("{id}")]
        [Route("GetRecipeById/{id}")]
        public async Task<ActionResult<Recipe>> GetRecipeById(int id, int? userId)
        {
            var recipe = await this.dbContext.Recipes.FindAsync(id);

            if (recipe == null)
            {
                return NotFound();
            }

            var result = new RecipeViewModel
            {
                Description = recipe.Description,
                Id = recipe.Id,
                Instructions = recipe.Instructions,
                ImageUrl = recipe.ImageUrl,
                LikesCount = recipe.LikesCount,
                Name = recipe.Name,
                Type = this.dbContext.Types.First(t => t.Id == recipe.TypeId).Name,
                UserId = recipe.UserId,
            };

            return new JsonResult(result);
        }

        [HttpPut("{id}")]
        [Route("Edit/{id}")]
        public async Task<IActionResult> PutRecipe(RecipeFormModel recipeFormModel)
        {
            var recipe = await this.dbContext.Recipes.FindAsync(recipeFormModel.Id);

            if (recipe == null) return BadRequest();

            recipe.Name = recipeFormModel.Name;
            recipe.ImageUrl = recipeFormModel.ImageUrl;
            recipe.Instructions = recipeFormModel.Instructions;
            recipe.Description = recipeFormModel.Description;
            recipe.TypeId = recipeFormModel.TypeId;

            await this.dbContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPost]
        [Route("PostRecipe")]
        public async Task<ActionResult<Recipe>> PostRecipe(RecipeFormModel recipeFormModel)
        {
            var recipe = new Recipe
            {
                Name = recipeFormModel.Name,
                ImageUrl = recipeFormModel.ImageUrl,
                Description = recipeFormModel.Description,
                Instructions = recipeFormModel.Instructions,
                LikesCount = 0,
                UserId = recipeFormModel.Id,
                TypeId = recipeFormModel.TypeId
        };

            await this.dbContext.Recipes.AddAsync(recipe);
            await this.dbContext.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        [Route("Delete/{id}")]
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

        [HttpGet("{userId}&{recipeId}")]
        public async Task<IActionResult> GetRelation(int? userId, int recipeId)
        {
            if (userId == null) return new JsonResult(false);

            var result = await this.dbContext.UserRecipe.FindAsync(userId, recipeId) == null ? false : true;

            return new JsonResult(result);
        }

        [HttpPost]
        [Route("Like/{userId}&{recipeId}")]
        public async Task<IActionResult> LikeRecipe(int userId, int recipeId)
        {
            var relation = await this.dbContext.UserRecipe.FindAsync(userId, recipeId);

            if (relation != null) return BadRequest();

            this.dbContext.UserRecipe.Add(new UserRecipe 
            {
                UserId = userId,
                RecipeId = recipeId
            });

            var recipe = this.dbContext.Recipes.First(r => r.Id == recipeId);
            recipe.LikesCount += 1;
            this.dbContext.SaveChanges();

            var result = new
            {
                LikesCount = recipe.LikesCount,
                HasRelation = false
            };

            return new JsonResult(result);
        }

        [HttpDelete("{userId}&{recipeId}")]
        [Route("Dislike/{userId}&{recipeId}")]
        public async Task<IActionResult> DislikeRecipe(int userId, int recipeId)
        {
            var relation = await this.dbContext.UserRecipe.FindAsync(userId, recipeId);

            if (relation == null) return BadRequest();

            this.dbContext.UserRecipe.Remove(relation);

            var recipe = this.dbContext.Recipes.First(r => r.Id == recipeId);
            recipe.LikesCount -= 1;
            this.dbContext.SaveChanges();

            var result = new
            {
                LikesCount = recipe.LikesCount,
                HasRelation = false
            };

            return new JsonResult(result);
        }

        [HttpGet("{userId}")]
        [Route("GetLikedRecipes/{userId}")]
        public async Task<IActionResult> GetLikedRecipes(int userId)
        {
            var recipeIds = this.dbContext.UserRecipe.Where(ur => ur.UserId == userId).Select(ur => ur.RecipeId);

            var result = new List<RecipeViewModel>();

            foreach (var id in recipeIds)
            {
                var recipe = this.dbContext.Recipes.First(r => r.Id == id);
                var output = new RecipeViewModel
                {
                    Name = recipe.Name,
                    Description = recipe.Description,
                    Instructions = recipe.Instructions,
                    Type = this.dbContext.Types.First(t => t.Id == recipe.TypeId).Name,
                    LikesCount = recipe.LikesCount,
                    Id = recipe.Id,
                    UserId = recipe.UserId,
                    ImageUrl = recipe.ImageUrl
                };
                result.Add(output);
            }

            return new JsonResult(result);
        }

        private bool RecipeExists(int id)
        {
            return this.dbContext.Recipes.Any(e => e.Id == id);
        }
    }
}
