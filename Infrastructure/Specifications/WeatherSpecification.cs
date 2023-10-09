using Domain;
using Shared.Specifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Specifications
{
    public class WeatherSpecification : BaseSpecification<Weather>
    {
        public WeatherSpecification(PaginationSpecParams paginationSpec, int? selectedYear, int? selectedMonth)
            : base (x => (selectedYear == default || x.Date.Year == selectedYear) && (selectedMonth == default || x.Date.Month == selectedMonth) && 
            (string.IsNullOrEmpty(paginationSpec.Search) || x.T.ToString().Contains(paginationSpec.Search) || x.AirHumidity.ToString().Contains(paginationSpec.Search) 
            || x.Td.ToString().Contains(paginationSpec.Search) || x.AtmospherePressure.ToString().Contains(paginationSpec.Search)
            || x.WindSpeed.ToString().Contains(paginationSpec.Search) || x.CloudCover.ToString().Contains(paginationSpec.Search)
            || x.h.ToString().Contains(paginationSpec.Search) || x.VV.ToString().Contains(paginationSpec.Search)
            || x.WindDirection.ToLower().Contains(paginationSpec.Search) || x.WeatherPhenomenon.ToLower().Contains(paginationSpec.Search)))
        {
            AddOrderByDescending(x => x.Date + x.Time);
            ApplyPaging(paginationSpec.PageSize * paginationSpec.PageIndex, paginationSpec.PageSize);
        }
    }
}
