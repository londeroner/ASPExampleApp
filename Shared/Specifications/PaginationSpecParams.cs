using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.Specifications
{
    public class PaginationSpecParams
    {
        public int PageIndex { get; set; } = 0;
        public string Sort { get; set; }

        private int _pageSize;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = value;
        }

        private string _search;
        public string Search
        {
            get => _search;
            set => _search = value.ToLower();
        }
    }
}
