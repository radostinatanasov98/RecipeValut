﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeValut.Data;
using RecipeValut.Data.Models;
using RecipeValut.Models.Recipe;

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
        public async Task<IActionResult> PutRecipe(RecipeFormModel recipeFormModel)
        {
            var recipe = await this.dbContext.Recipes.FindAsync(recipeFormModel.Id);

            if (recipe == null) return BadRequest();

            recipe.Name = recipeFormModel.Name;
            recipe.ImageUrl = recipeFormModel.ImageUrl;
            recipe.Instructions = recipeFormModel.Instructions;
            recipe.Description = recipeFormModel.Description;

            await this.dbContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult<Recipe>> PostRecipe(RecipeFormModel recipeFormModel)
        {
            var recipe = new Recipe
            {
                Name = recipeFormModel.Name,
                ImageUrl = recipeFormModel.ImageUrl,
                Description = recipeFormModel.Description,
                Instructions = recipeFormModel.Instructions,
                LikesCount = 0
            };

            await this.dbContext.Recipes.AddAsync(recipe);
            await this.dbContext.SaveChangesAsync();

            return Ok();
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
