using Domain;
using Shared.Specifications;

namespace Infrastructure.Specifications
{
    public class WeatherForCountSpecification : BaseSpecification<Weather>
    {
        public WeatherForCountSpecification(PaginationSpecParams paginationSpec, int? selectedYear, int? selectedMonth)
            : base (x => (selectedYear == default || x.Date.Year == selectedYear) && (selectedMonth == default || x.Date.Month == selectedMonth) && 
            (string.IsNullOrEmpty(paginationSpec.Search) || x.T.ToString().Contains(paginationSpec.Search) || x.AirHumidity.ToString().Contains(paginationSpec.Search) 
            || x.Td.ToString().Contains(paginationSpec.Search) || x.AtmospherePressure.ToString().Contains(paginationSpec.Search)
            || x.WindSpeed.ToString().Contains(paginationSpec.Search) || x.CloudCover.ToString().Contains(paginationSpec.Search)
            || x.h.ToString().Contains(paginationSpec.Search) || x.VV.ToString().Contains(paginationSpec.Search)
            || x.WindDirection.ToLower().Contains(paginationSpec.Search) || x.WeatherPhenomenon.ToLower().Contains(paginationSpec.Search)))
        {
        }
    }
}
