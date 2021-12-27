namespace RecipeValut.Models.Recipe
{
    public class RecipeViewModel
    {
        public int Id { get; init; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Instructions { get; set; }

        public int LikesCount { get; set; }

        public int UserId { get; init; }

        public string Type { get; init; }

        public string ImageUrl { get; set; }
    }
}
