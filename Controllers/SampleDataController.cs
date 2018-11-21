using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace PlayWithReact.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        static Lazy<IReadOnlyList<WeatherForecast>> Data = new Lazy<IReadOnlyList<WeatherForecast>>(FillData);

        private static IReadOnlyList<WeatherForecast> FillData()
        {
            var rng = new Random();
            return Enumerable.Range(0, 100).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            }).ToList();
        }

        [HttpGet("[action]")]
        public PagedResponse<WeatherForecast> WeatherForecasts(int currentPage, int pageSize)
        {
            return new PagedResponse<WeatherForecast>(Data.Value.Skip((currentPage - 1) * pageSize).Take(pageSize), Data.Value.Count);
        }

        public class PagedResponse<T>
        {
            public IEnumerable<T> Data { get; }
            public int TotalCount { get; }

            public PagedResponse(IEnumerable<T> data, int totalCount)
            {
                Data = data;
                TotalCount = totalCount;
            }
        }

        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(TemperatureC / 0.5556);
                }
            }
        }
    }
}
