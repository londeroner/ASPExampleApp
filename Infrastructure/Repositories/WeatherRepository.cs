using Infrastructure.Repositories.Interfaces;
using Infrastructure.DomainContext;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using Domain;
using System.Globalization;

namespace Infrastructure.Repositories
{
    public class WeatherRepository : IWeatherRepository
    {
        private readonly DomainDbContext _context;
        public WeatherRepository(DomainDbContext context)
        {
            _context = context;
        }

        public bool SaveDataFromExcel(string base64Content)
        {
            byte[] fileBytes = Convert.FromBase64String(base64Content);
            IWorkbook workbook;

            using (Stream stream = new MemoryStream(fileBytes))
            {
                workbook = new XSSFWorkbook(stream);
            }

            if (workbook is not { })
                return false;

            if (workbook.NumberOfSheets != 12)
                return false;

            for (int i = 0; i < workbook.NumberOfSheets; i++)
            {
                int j = 4;
                ISheet sheet = workbook.GetSheetAt(i);
                IRow row = sheet.GetRow(j);

                while (row is { })
                {
                    Weather weather = new Weather();
                    try
                    {
                        weather.Date = DateTime.ParseExact(row.GetCell(0).StringCellValue, "dd.MM.yyyy", CultureInfo.InvariantCulture);
                        
                        weather.Time = TimeSpan.Parse(row.GetCell(1).StringCellValue);

                        weather.T = row.GetCell(2).CellType == CellType.Numeric
                            ? (float)row.GetCell(2).NumericCellValue : null;

                        weather.AirHumidity = row.GetCell(3).CellType == CellType.Numeric
                            ? (int)row.GetCell(3).NumericCellValue : null;

                        weather.Td = row.GetCell(4).CellType == CellType.Numeric
                            ? (float)row.GetCell(4).NumericCellValue : null;

                        weather.AtmospherePressure = row.GetCell(5).CellType == CellType.Numeric
                            ? (int)row.GetCell(5).NumericCellValue : null;

                        weather.WindDirection = row.GetCell(6).StringCellValue;

                        weather.WindSpeed = row.GetCell(7).CellType == CellType.Numeric
                            ? (int)row.GetCell(7).NumericCellValue : null;

                        weather.CloudCover = row.GetCell(8).CellType == CellType.Numeric
                            ? (int)row.GetCell(8).NumericCellValue : null;

                        weather.h = row.GetCell(9).CellType == CellType.Numeric
                            ? (int)row.GetCell(9).NumericCellValue : null;

                        weather.VV = row.GetCell(10).CellType == CellType.Numeric
                            ? (int)row.GetCell(10).NumericCellValue : null;

                        weather.WeatherPhenomenon = row.GetCell(11) is { } ? row.GetCell(11).StringCellValue : "";
                    }
                    catch
                    {
                        return false;
                    }
                    row = sheet.GetRow(++j);
                    _context.Weather.Add(weather);
                }
            }

            _context.SaveChanges();

            return true;
        }
    }
}
