using System.ComponentModel.DataAnnotations;

namespace RecipeValut.Data.Models
{
    public class Recipe
    {
        [Key]
        public int Id { get; init; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string ImageUrl { get; set; }

        public string Description { get; set; }

        [Required]
        public string Instructions { get; set; }

        public int LikesCount { get; set; }

        [Required]
        public int UserId { get; set; }

        public User User { get; init; }

        [Required]
        public int TypeId { get; set; }

        public Type Type { get; init; }
    }
}
