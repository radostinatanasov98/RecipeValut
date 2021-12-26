using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RecipeValut.Data.Models
{
    public class Type
    {
        [Key]
        public int Id { get; init; }

        [Required]
        public string Name { get; init; }

        public virtual ICollection<Recipe> Recipes { get; set; }
    }
}
