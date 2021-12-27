namespace RecipeValut.Models.Recipe
{
    public class RecipeFormModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public string Description { get; set; }

        public string Instructions { get; set; }

        public int TypeId { get; set; }
    }
}
