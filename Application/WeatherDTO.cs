namespace Application
{
    public class WeatherDTO
    {
        public string Date { get; set; }
        public string Time { get; set; }
        public float? T { get; set; }
        public int? AirHumidity { get; set; }
        public float? Td { get; set; }
        public int? AtmospherePressure { get; set; }
        public string WindDirection { get; set; }
        public int? WindSpeed { get; set; }
        public int? CloudCover { get; set; }
        public int? h { get; set; }
        public int? VV { get; set; }
        public string WeatherPhenomenon { get; set; }
    }
}

