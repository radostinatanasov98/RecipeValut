namespace RecipeValut.Services
{
    public interface IJWTService
    {
        public void Encode(int id);

        public void Decode(string token);
    }
}
