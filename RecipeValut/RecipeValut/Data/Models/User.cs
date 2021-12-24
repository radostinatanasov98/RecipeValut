using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RecipeValut.Data.Models
{
    public class User
    {
        [Key]
        public int Id { get; init; }

        [Required]
        public string Username { get; init; }

        [Required]
        public string Password { get; set; }

        public IEnumerable<Recipe> Recipes { get; set; }
    }
}
