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

        public DbSet<UserRecipe> UserRecipe { get; init; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserRecipe>()
                .HasKey(x => new { x.UserId, x.RecipeId });
        }
    }
}
