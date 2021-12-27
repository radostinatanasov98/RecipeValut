using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RecipeValut.Data;
using RecipeValut.Data.Models;
using System.Linq;

namespace RecipeValut.Infrastructure
{
    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder PrepareDatabase(
            this IApplicationBuilder app)
        {
            using var scopedServices = app.ApplicationServices.CreateScope();
            var serviceProvider = scopedServices.ServiceProvider;

            var dbContext = serviceProvider.GetRequiredService<RecipeValutDbContext>();

            dbContext.Database.Migrate();

            SeedTypes(dbContext);

            return app;
        }

        private static void SeedTypes(RecipeValutDbContext dbContext)
        {
            if (dbContext.Types.Any()) return;

            dbContext.Types.AddRange(new[]
            {
                new Type {Name = "Meat"},
                new Type {Name = "Vegan"},
                new Type {Name = "Vegetarian"}
            });

            dbContext.SaveChanges();
        }
    }
}
