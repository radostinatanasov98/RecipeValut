using System.ComponentModel.DataAnnotations;

namespace RecipeValut.Data.Models
{
    public class UserRecipe
    {
        [Required]
        public int UserId { get; set; }

        public User User { get; set; }

        [Required]
        public int RecipeId { get; set; }

        public Recipe Recipe { get; set; }
    }
}
