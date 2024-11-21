using Microsoft.Extensions.Logging;
using Show.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Show.ApplicationService.Common
{
    public abstract class ShowServiceBase
    {
        protected readonly ILogger _logger;
        protected readonly ShowDbContext _dbContext;

        protected ShowServiceBase(ILogger logger, ShowDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }
    }
}
