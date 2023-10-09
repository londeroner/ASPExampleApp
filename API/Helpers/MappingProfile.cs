using Application;
using AutoMapper;
using Domain;

namespace API.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Weather, WeatherDTO>()
                .ForMember(x => x.Date, act => act.MapFrom(src => src.Date.ToString("d")))
                .ForMember(x => x.Time, act => act.MapFrom(src => src.Time.ToString("t")));
        }
    }
}