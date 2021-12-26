using Microsoft.EntityFrameworkCore;
using RecipeValut.Data.Models;

namespace RecipeValut.Data
{
    public class RecipeValutDbContext : DbContext
    {
        public RecipeValutDbContext(DbContextOptions<RecipeValutDbContext> options)
        : base(options)
        {
        }

        public DbSet<Recipe> Recipes { get; init; }

        public DbSet<User> Users { get; init; }

        public DbSet<Type> Types { get; init; }
    }
}
