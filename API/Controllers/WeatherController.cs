using API.Helpers;
using Application;
using AutoMapper;
using Domain;
using Infrastructure.Repositories.Interfaces;
using Infrastructure.Specifications;
using Microsoft.AspNetCore.Mvc;
using Shared.Repositories.Interfaces;
using Shared.Specifications;

namespace API.Controllers;

[Route("api/[controller]")]
public class WeatherController : Controller
{
    private readonly IWeatherRepository _weatherRepository;
    private readonly IGenericRepository<Weather> _genericRepository;
    private readonly IMapper _mapper;

    public WeatherController(IWeatherRepository weatherRepository, IGenericRepository<Weather> genericRepository, IMapper mapper)
    {
        _weatherRepository = weatherRepository;
        _genericRepository = genericRepository;
        _mapper = mapper;
    }

    [HttpGet("getpagingweather")]
    public async Task<ActionResult<Pagination<WeatherDTO>>> Get([FromQuery] PaginationSpecParams specParams, [FromQuery] int? selectedYear, [FromQuery] int? selectedMonth)
    {
        var spec = new WeatherSpecification(specParams, selectedYear, selectedMonth);
        var countSpec = new WeatherForCountSpecification(specParams, selectedYear, selectedMonth);

        var totalItems = await _genericRepository.CountAsync(countSpec);
        var items = await _genericRepository.ListAsync(spec);

        var data = _mapper.Map<IReadOnlyList<Weather>, IReadOnlyList<WeatherDTO>>(items);

        return Ok(new Pagination<WeatherDTO>(specParams.PageIndex, specParams.PageSize, totalItems, data));
    }

    [HttpPost("uploadweather")]
    public ActionResult Upload([FromBody] URLFile file)
    {
        if (_weatherRepository.SaveDataFromExcel(file.base64Content))
            return Ok();
        else return BadRequest("Не удалось разобрать Excel файл.");
    }
}
