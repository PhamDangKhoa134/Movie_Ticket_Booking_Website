using Microsoft.Extensions.Logging;
using Movie.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.ApplicationService.Common
{
    public abstract class MovieServiceBase
    {
        protected readonly ILogger _logger;
        protected readonly MovieDbContext _dbContext;

        protected MovieServiceBase(ILogger logger, MovieDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }
    }
}
