using System.ComponentModel.DataAnnotations;

namespace RecipeValut.Data.Models
{
    public class Recipe
    {
        [Key]
        public int Id { get; init; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public string Instructions { get; set; }

        public int LikesCount { get; set; }

        [Required]
        public int UserId { get; init; }

        public User User { get; init; }
    }
}
