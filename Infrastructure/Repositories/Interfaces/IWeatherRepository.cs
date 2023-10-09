namespace Infrastructure.Repositories.Interfaces
{
    public interface IWeatherRepository
    {
        public bool SaveDataFromExcel(string base64Content);
    }
}
