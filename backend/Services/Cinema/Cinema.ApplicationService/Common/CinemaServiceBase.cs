using Cinema.Infrastructure;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cinema.ApplicationService.Common
{
    public abstract class CinemaServiceBase
    {
        protected readonly ILogger _logger;
        protected readonly CinemaDbContext _dbContext;

        protected CinemaServiceBase(ILogger logger, CinemaDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }
    }
}
